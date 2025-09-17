import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText } from 'lucide-react';
import { useTripPlanner } from '@/hooks/useTripPlanner';
import { toast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PDFExport = () => {
  const { savedMonasteries, savedEvents } = useTripPlanner();

  const generatePDF = async () => {
    if (savedMonasteries.length === 0 && savedEvents.length === 0) {
      toast({
        title: "Empty Itinerary",
        description: "Add monasteries and events to your itinerary before generating PDF.",
        variant: "destructive"
      });
      return;
    }

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;

      // Header
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Monastery360 - Trip Itinerary', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 15;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 20;

      // Monasteries Section
      if (savedMonasteries.length > 0) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Monasteries to Visit', 20, yPosition);
        yPosition += 10;

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        
        savedMonasteries.forEach((monastery, index) => {
          if (yPosition > pageHeight - 30) {
            pdf.addPage();
            yPosition = 20;
          }
          
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${index + 1}. ${monastery.name}`, 20, yPosition);
          yPosition += 5;
          
          pdf.setFont('helvetica', 'normal');
          pdf.text(`Location: ${monastery.location}`, 25, yPosition);
          yPosition += 4;
          pdf.text(`Era: ${monastery.era}`, 25, yPosition);
          yPosition += 4;
          
          // Description with text wrapping
          const descriptionLines = pdf.splitTextToSize(monastery.description, pageWidth - 50);
          pdf.text(descriptionLines, 25, yPosition);
          yPosition += descriptionLines.length * 4 + 5;
        });

        yPosition += 10;
      }

      // Events Section
      if (savedEvents.length > 0) {
        if (yPosition > pageHeight - 50) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Events & Festivals', 20, yPosition);
        yPosition += 10;

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        
        savedEvents.forEach((event, index) => {
          if (yPosition > pageHeight - 30) {
            pdf.addPage();
            yPosition = 20;
          }
          
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${index + 1}. ${event.title}`, 20, yPosition);
          yPosition += 5;
          
          pdf.setFont('helvetica', 'normal');
          pdf.text(`Date: ${event.date.toLocaleDateString()}`, 25, yPosition);
          yPosition += 4;
          pdf.text(`Location: ${event.location}`, 25, yPosition);
          yPosition += 4;
          
          const eventDescLines = pdf.splitTextToSize(event.description, pageWidth - 50);
          pdf.text(eventDescLines, 25, yPosition);
          yPosition += eventDescLines.length * 4 + 5;
        });
      }

      // Travel Tips Section
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = 20;
      } else {
        yPosition += 15;
      }

      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Travel Tips & Important Information', 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      const tips = [
        'Permits: Inner Line Permit required for Indian nationals, PAP for foreigners',
        'Best Time: March-June and September-December',
        'Weather: Carry warm clothes and rain protection',
        'Altitude: Take time to acclimatize, stay hydrated',
        'Respect: Follow monastery etiquette, photography rules',
        'Emergency: Keep local emergency contacts handy'
      ];

      tips.forEach(tip => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }
        pdf.text(`• ${tip}`, 25, yPosition);
        yPosition += 6;
      });

      // Footer
      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.text(`Monastery360 - Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      }

      // Save PDF
      pdf.save('monastery360-itinerary.pdf');
      
      toast({
        title: "PDF Generated Successfully!",
        description: "Your trip itinerary has been downloaded as a PDF file.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Offline Trip Pack
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Download your complete itinerary as a PDF for offline access during your trip.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              PDF Content
            </h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Complete monastery details & history
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Optimized travel routes & maps
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Transport contacts & booking info
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Cultural events & festival calendar
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Emergency contacts & permits
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Offline QR codes for quick access
              </li>
            </ul>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Coming Soon
            </h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-monastery-saffron rounded-full" />
                Interactive offline maps
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-monastery-saffron rounded-full" />
                Audio guide downloads
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-monastery-saffron rounded-full" />
                Weather forecasts
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-monastery-saffron rounded-full" />
                Real-time updates
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={generatePDF} className="w-full h-12 text-base">
            <Download className="h-5 w-5 mr-3" />
            Download Complete Trip Pack
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" disabled className="h-10">
              <Download className="h-4 w-4 mr-2" />
              Offline Maps
            </Button>
            <Button variant="outline" disabled className="h-10">
              <Download className="h-4 w-4 mr-2" />
              Audio Guides
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <div className="text-blue-600 mt-0.5">💡</div>
            <div className="text-sm text-blue-800">
              <strong>Pro Tip:</strong> Download and save this PDF to your phone's storage for instant offline access during your monastery visits, even without internet connection.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PDFExport;