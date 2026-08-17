import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_prerevenue_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=54,
        leftMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#0F172A'),
        fontName='Helvetica-Bold',
        spaceAfter=6
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#64748B'),
        fontName='Helvetica',
        spaceAfter=15
    )

    section_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Heading2'],
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#1E293B'),
        fontName='Helvetica-Bold',
        spaceBefore=12,
        spaceAfter=8
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#334155'),
        fontName='Helvetica',
        spaceAfter=10
    )

    elements = []

    # Title & Subtitle
    elements.append(Paragraph("SocraticAI — Financial Declaration & P&L Statement", title_style))
    elements.append(Paragraph("Pre-Revenue Project Declaration for Hackathon Organizers & Judges", subtitle_style))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#0EA5E9'), spaceAfter=15))

    # General Information Table
    data_general = [
        [Paragraph("<b>Project Name:</b>", body_style), Paragraph("SocraticAI", body_style)],
        [Paragraph("<b>Development Stage:</b>", body_style), Paragraph("Pre-Revenue Prototype / Hackathon Entry", body_style)],
        [Paragraph("<b>Development Start Date:</b>", body_style), Paragraph("August 01, 2026", body_style)],
        [Paragraph("<b>Primary Track:</b>", body_style), Paragraph("Education & Human Potential", body_style)],
        [Paragraph("<b>Stripe Account Status:</b>", body_style), Paragraph("Pre-Revenue (Zero Commercial Billing Active)", body_style)]
    ]
    t_gen = Table(data_general, colWidths=[150, 350])
    t_gen.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('PADDING', (0,0), (-1,-1), 8),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    elements.append(t_gen)
    elements.append(Spacer(1, 15))

    # P&L Summary Table
    elements.append(Paragraph("Financial Profit & Loss (P&L) Summary", section_style))
    
    pnl_data = [
        [Paragraph("<b>Financial Metric</b>", body_style), Paragraph("<b>Amount (USD)</b>", body_style), Paragraph("<b>Notes</b>", body_style)],
        [Paragraph("Gross Commercial Revenue", body_style), Paragraph("$0.00", body_style), Paragraph("Pre-revenue prototype phase", body_style)],
        [Paragraph("Stripe Transacted Revenue", body_style), Paragraph("$0.00", body_style), Paragraph("No Stripe payments collected to date", body_style)],
        [Paragraph("Operating Expenses (Cloud/API)", body_style), Paragraph("$0.00", body_style), Paragraph("Utilized free-tier developer credits", body_style)],
        [Paragraph("<b>Net Profit / (Loss)</b>", body_style), Paragraph("<b>$0.00</b>", body_style), Paragraph("Balanced pre-revenue status", body_style)]
    ]
    t_pnl = Table(pnl_data, colWidths=[160, 100, 240])
    t_pnl.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F172A')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('PADDING', (0,0), (-1,-1), 8),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    elements.append(t_pnl)
    elements.append(Spacer(1, 20))

    # Declaration Text
    elements.append(Paragraph("Official Organizer Declaration", section_style))
    declaration_text = (
        "We hereby certify that <b>SocraticAI</b> was developed as a competition entry. "
        "As an early-stage educational technology prototype, the project has generated zero commercial sales, "
        "and no paid transactions have been processed via Stripe or external payment gateways to date. "
        "All cloud infrastructure (Vercel, Render, Gemini API, Supabase) was operated under free developer tiers."
    )
    elements.append(Paragraph(declaration_text, body_style))
    elements.append(Spacer(1, 25))

    # Signature Box
    sig_data = [
        [Paragraph("<b>Certified By:</b> Team SocraticAI", body_style), Paragraph("<b>Date:</b> August 17, 2026", body_style)]
    ]
    t_sig = Table(sig_data, colWidths=[250, 250])
    t_sig.setStyle(TableStyle([
        ('PADDING', (0,0), (-1,-1), 10),
        ('LINEABOVE', (0,0), (-1,0), 1, colors.HexColor('#0EA5E9')),
    ]))
    elements.append(t_sig)

    doc.build(elements)

if __name__ == "__main__":
    desktop_path = os.path.expanduser("~/Desktop/SocraticAI_PreRevenue_Financial_Declaration.pdf")
    workspace_path = "/Users/tzierrr/geminix/SocraticAI_PreRevenue_Financial_Declaration.pdf"
    generate_prerevenue_pdf(desktop_path)
    generate_prerevenue_pdf(workspace_path)
    print("PDF generated successfully at:", desktop_path)
