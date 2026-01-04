"""
PDF Field Filler
Fill PDF forms with data from master profile
"""

from pypdf import PdfReader, PdfWriter
import json

def list_pdf_fields(pdf_path: str) -> dict:
    """List all fillable fields in PDF"""
    reader = PdfReader(pdf_path)
    fields = reader.get_fields()
    return {name: field.get('/T', '') for name, field in fields.items()}

def fill_pdf(template_path: str, output_path: str, data: dict):
    """Fill PDF with data"""
    reader = PdfReader(template_path)
    writer = PdfWriter()

    # Fill fields
    writer.append_pages_from_reader(reader)
    writer.update_page_form_field_values(writer.pages[0], data)

    # Write output
    with open(output_path, 'wb') as output_file:
        writer.write(output_file)

    return output_path

def flatten_pdf(pdf_path: str, output_path: str):
    """Flatten PDF to prevent editing"""
    reader = PdfReader(pdf_path)
    writer = PdfWriter()

    for page in reader.pages:
        writer.add_page(page)

    # Flatten
    writer.flatten()

    with open(output_path, 'wb') as output_file:
        writer.write(output_file)

    return output_path

if __name__ == "__main__":
    # Example usage
    fields = list_pdf_fields("template.pdf")
    print(json.dumps(fields, indent=2))
