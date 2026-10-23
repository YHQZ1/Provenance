from ocr_service.pipeline.parsing import (
    detect_document_type,
    extract_fields,
    parse_line_items,
    tokens_to_text,
)

INVOICE_0_TEXT = """Tax Invoice
Invoice No:1410515599 Customer No:791114435
Delivery Type Invoice Date INTERNATIONAL CARRIER 27/07/2020
Payment Terms Due Date 25/09/2020
Description Dell Latitude 3301 CTO Place of Supply MAHARASHTRA HSN/SAC Quantity 1 Unit Price 51,207.00"""

INVOICE_1_TEXT = """TAX INVOICE
INVOICE NO VST/783 12-07-2022
S.N. 4U Rack 500 D Model With Accessories
QTY NET AMT 7,174.40
2 Nos 6,080.00 18%"""

INVOICE_2_TEXT = """Tax Invoice
To, Hindalco Industries Limited Date:- Invoice No.- AMC/2122/FA/0019 28-09-2021
Sr.NoParticulars 1Sale of Old Car of Lalit Kumar Apparao Kodi HSN 87032291 Amount"""

INVOICE_3_TEXT = """Tax Invoice
S Description of Goods HSN/SAC Quantity Rate Amount No
2 Plastic Compounds Plastic Compounds 3902 3902 11,000.00KG 7,000.00KG 63.50 62.00 KG KG"""

INVOICE_4_TEXT = """Tax Invoice
No. DESCRIPTION OF GOODS UNIT HSN CODE QTY RATE Amount
1PLASTIC SCRAP KGS 3915 2375.000 15.00 35625.00"""


def test_tokens_are_reconstructed_per_page():
    tokens = [
        {"text": "Date:", "page": 1, "x": 0.1, "y": 0.1, "conf": 1},
        {"text": "01/02/2025", "page": 1, "x": 0.2, "y": 0.1, "conf": 1},
        {"text": "Second", "page": 0, "x": 0.1, "y": 0.1, "conf": 1},
    ]
    assert tokens_to_text(tokens) == "Second\n\nDate: 01/02/2025"


def test_invoice_fields_require_labels_and_ignore_due_date():
    fields = extract_fields(INVOICE_0_TEXT, 0.9)
    assert fields["invoice_number"]["value"] == "1410515599"
    assert fields["invoice_date"]["value"] == "27/07/2020"


def test_invoice_fields_support_common_invoice_layouts():
    fields_one = extract_fields(INVOICE_1_TEXT, 0.9)
    fields_two = extract_fields(INVOICE_2_TEXT, 0.9)
    assert fields_one["invoice_number"]["value"] == "VST/783"
    assert fields_one["invoice_date"]["value"] == "12-07-2022"
    assert fields_two["invoice_number"]["value"] == "AMC/2122/FA/0019"
    assert fields_two["invoice_date"]["value"] == "28-09-2021"


def test_gstin_is_extracted():
    fields = extract_fields("GSTIN: 22AAAAA0000A1Z5", 0.9)
    assert fields["gstin"]["value"] == "22AAAAA0000A1Z5"


def test_line_items_extract_quantity_and_unit():
    items = parse_line_items("PET bottles clear 500 kg 42.5", 0.8)
    assert items == [
        {
            "description": "PET bottles clear",
            "quantity": 500.0,
            "unit": "kg",
            "rate": 42.5,
            "amount": None,
            "raw_text": "PET bottles clear 500 kg 42.5",
            "confidence": 0.8,
        }
    ]


def test_invoice_fixture_layouts_produce_line_items():
    invoice_zero = parse_line_items(INVOICE_0_TEXT, 0.9)
    invoice_one = parse_line_items(INVOICE_1_TEXT, 0.9)
    invoice_two = parse_line_items(INVOICE_2_TEXT, 0.9)

    assert invoice_zero[0]["description"] == "Dell Latitude 3301 CTO"
    assert invoice_zero[0]["quantity"] == 1
    assert "4U Rack 500 D" in invoice_one[0]["description"]
    assert invoice_one[0]["quantity"] == 2
    assert invoice_one[0]["unit"] == "nos"
    assert "Sale of Old Car" in invoice_two[0]["description"]
    assert invoice_two[0]["quantity"] == 1


def test_hsn_rows_extract_multiple_quantities_from_flattened_invoice_table():
    items = parse_line_items(INVOICE_3_TEXT, 0.9)

    assert len(items) == 2
    assert all(item["description"] == "Plastic Compounds" for item in items)
    assert [item["quantity"] for item in items] == [11000.0, 7000.0]
    assert all(item["unit"] == "kg" for item in items)


def test_hsn_rows_extract_quantity_when_unit_precedes_hsn_code():
    items = parse_line_items(INVOICE_4_TEXT, 0.9)

    assert len(items) == 1
    assert items[0]["description"] == "PLASTIC SCRAP"
    assert items[0]["quantity"] == 2375.0
    assert items[0]["unit"] == "kgs"


def test_indian_number_grouping_and_weight_units_are_extracted():
    text = "\n".join(
        [
            "PET Preform 1,00,000 kg",
            "HDPE Granules 1,250.50 kg",
            "PP Caps 500 g",
            "LDPE Liner 12 tonnes",
        ]
    )

    items = parse_line_items(text, 0.9)

    assert [(item["description"], item["quantity"], item["unit"]) for item in items] == [
        ("PET Preform", 100000.0, "kg"),
        ("HDPE Granules", 1250.5, "kg"),
        ("PP Caps", 500.0, "g"),
        ("LDPE Liner", 12.0, "tonnes"),
    ]


def test_month_name_invoice_dates_are_extracted():
    assert (
        extract_fields("Invoice Date: 12-Jul-2022", 0.9)["invoice_date"]["value"] == "12-Jul-2022"
    )
    assert extract_fields("Bill Date 03 Sept 2026", 0.9)["invoice_date"]["value"] == "03 Sept 2026"


def test_tightly_spaced_lines_stay_separate():
    def token(text, x, y):
        return {
            "text": text,
            "x": x,
            "y": y,
            "w": 0.2,
            "h": 0.012,
            "page": 0,
            "conf": 1.0,
            "source": "pdf",
        }

    text = tokens_to_text(
        [
            token("PET Preform", 0.1, 0.100),
            token("1,00,000 kg", 0.5, 0.101),
            token("HDPE Caps", 0.1, 0.1155),
            token("500 g", 0.5, 0.1155),
        ]
    )

    assert text.splitlines() == ["PET Preform 1,00,000 kg", "HDPE Caps 500 g"]


def test_separate_table_rows_take_quantity_not_rate():
    text = "\n".join(
        [
            "Plastic Compounds 3902 11,000.00KG 63.50 KG",
            "2 Plastic Compounds 3902 7,000.00KG 62.00 KG",
            "Total 18,000.00KG",
        ]
    )

    items = parse_line_items(text, 0.9)

    assert [(item["description"], item["quantity"], item["unit"]) for item in items] == [
        ("Plastic Compounds", 11000.0, "kg"),
        ("Plastic Compounds", 7000.0, "kg"),
    ]
    assert items[0]["rate"] == 63.5


def test_total_rows_are_not_line_items():
    assert parse_line_items("Grand Total 18,000 kg", 0.9) == []


def test_date_below_its_label_is_extracted():
    assert (
        extract_fields("Dated\n22-Jul-2020\nDelivery Note", 0.9)["invoice_date"]["value"]
        == "22-Jul-2020"
    )


def test_date_in_column_header_row_is_extracted():
    text = "AMG POLYCHEM Invoice No. e-Way Bill No. Dated\nGala No.6 Ground Floor 012/20-21 22-Jul-2020"
    assert extract_fields(text, 0.9)["invoice_date"]["value"] == "22-Jul-2020"


def test_invoice_references_are_not_mistaken_for_dates():
    assert (
        extract_fields("Invoice No. Dated\n012/20-21 22-Jul-2020", 0.9)["invoice_date"]["value"]
        == "22-Jul-2020"
    )


KG_TABLE_TEXT = """# Description of Goods HSN/SAC Quantity Unit Rate (INR) Amount (INR)
1 LDPE shrink film 80 micron, 450 mm width, natural 3920 10 1,850.00 kg 142.00 2,62,700.00
Printed laminated pouch film PET/PE 90 micron
2 3921 90 2,400.00 kg 218.50 5,24,400.00
(multilayer)
3 Freight and handling, Mangaluru to Bengaluru 9965 1.00 job 6,200.00 6,200.00
Total net weight of plastic goods: 4,250.00 kg Total taxable value 7,87,100.00"""

PIECES_TABLE_TEXT = """# Description of Goods HSN/SAC Qty (Nos) Net Wt (kg) Rate/Pc Amount (INR)
(g)
HDPE bottle 1000 ml, 38 mm neck,
1 3923 30 25,000 48 1,200.00 6.10 1,52,500.00
natural, 48 g
3 PP flip-top cap 38 mm, 4.2 g 3923 50 65,000 4.2 273.00 0.92 59,800.00
Total net weight of plastic goods: 1,473.00 kg Total taxable value 2,12,300.00"""

CERTIFICATE_TABLE_TEXT = """# Plastic type Category Period Received (kg) Recycled (kg) Yield Recycled output
PET bottles Q1 Apr-Jun
1 Cat. I 5,200.00 4,850.00 93.3% PET flakes
(post-consumer) 2024
2 HDPE rigid containers Cat. I Apr-Sep 2025 9,600.00 9,010.00 93.9% HDPE regrind
Total 14,800.00 13,860.00 93.6%"""

RECEIPT_TABLE_TEXT = """# Material CPCB category Net quantity (kg) Share Handling fee (INR)
1 PET bottles, baled Category I 1,260.00 43.8% 4,410.00
2 Multilayer pouches and sachets Category III 355.00 12.3% 1,242.50
3 Mixed plastic packaging Category I 180.00 6.2% 630.00
Total 1,795.00 100.0% 6,282.50"""


def _summary(items):
    return [(item["description"], item["quantity"], item["unit"]) for item in items]


def test_kg_table_rows_keep_wrapped_descriptions_and_skip_services():
    items = parse_line_items(KG_TABLE_TEXT, 0.9)

    assert _summary(items) == [
        ("LDPE shrink film 80 micron, 450 mm width, natural", 1850.0, "kg"),
        ("Printed laminated pouch film PET/PE 90 micron (multilayer)", 2400.0, "kg"),
    ]


def test_pieces_table_uses_net_weight_not_unit_weight():
    items = parse_line_items(PIECES_TABLE_TEXT, 0.9)

    assert _summary(items) == [
        ("HDPE bottle 1000 ml, 38 mm neck, natural, 48 g", 1200.0, "kg"),
        ("PP flip-top cap 38 mm, 4.2 g", 273.0, "kg"),
    ]


def test_certificate_rows_use_recycled_quantity_and_drop_period_text():
    items = parse_line_items(CERTIFICATE_TABLE_TEXT, 0.9)

    assert _summary(items) == [
        ("PET bottles (post-consumer)", 4850.0, "kg"),
        ("HDPE rigid containers", 9010.0, "kg"),
    ]


def test_receipt_rows_read_net_quantity_for_every_row():
    items = parse_line_items(RECEIPT_TABLE_TEXT, 0.9)

    assert _summary(items) == [
        ("PET bottles, baled", 1260.0, "kg"),
        ("Multilayer pouches and sachets", 355.0, "kg"),
        ("Mixed plastic packaging", 180.0, "kg"),
    ]


def test_document_type_is_read_from_the_heading():
    assert (
        detect_document_type("GreenLoop\nRECYCLING CERTIFICATE\nCertificate No.", True)
        == "recycling_certificate"
    )
    assert (
        detect_document_type("Swachh\nCOLLECTION RECEIPT\nWeighbridge", True)
        == "collection_receipt"
    )
    assert (
        detect_document_type("ANNUAL RETURN - EXTENDED PRODUCER RESPONSIBILITY", False)
        == "epr_record"
    )
    assert detect_document_type("Portal\nACKNOWLEDGEMENT\nFiling submitted", False) == "epr_record"


def test_a_late_mention_of_certificates_does_not_change_the_type():
    text = "Aarav Foods\nEPR STATEMENT\nEPR OBLIGATION AND FULFILMENT STATEMENT\n" + "x " * 400
    text += "Procure Category II recycling certificates"
    assert detect_document_type(text, True) == "epr_record"


def test_document_type_falls_back_to_invoice_then_unknown():
    assert detect_document_type("Kaveri Flexipack\nTAX INVOICE\nInvoice No. 12", True) == "invoice"
    assert detect_document_type("Delivery note\n3 boxes", False) == "unknown"
