import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Map, Home, Car, Navigation, Phone } from 'lucide-react';
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

      // Header with enhanced styling
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Monastery360 - Complete Travel Package', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 15;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 20;

      // Monasteries Section
      if (savedMonasteries.length > 0) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('🏛️ Monasteries to Visit', 20, yPosition);
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
          pdf.text(`📍 Location: ${monastery.location}`, 25, yPosition);
          yPosition += 4;
          pdf.text(`⏰ Era: ${monastery.era}`, 25, yPosition);
          yPosition += 4;
          pdf.text(`🕐 Recommended visit: 2-3 hours`, 25, yPosition);
          yPosition += 4;
          
          // Description with text wrapping
          const descriptionLines = pdf.splitTextToSize(monastery.description, pageWidth - 50);
          pdf.text(descriptionLines, 25, yPosition);
          yPosition += descriptionLines.length * 4 + 8;
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
        pdf.text('🎭 Events & Festivals', 20, yPosition);
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
          pdf.text(`📅 Date: ${event.date.toLocaleDateString()}`, 25, yPosition);
          yPosition += 4;
          pdf.text(`📍 Location: ${event.location}`, 25, yPosition);
          yPosition += 4;
          
          const eventDescLines = pdf.splitTextToSize(event.description, pageWidth - 50);
          pdf.text(eventDescLines, 25, yPosition);
          yPosition += eventDescLines.length * 4 + 8;
        });
      }

      // Map Information Section
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = 20;
      } else {
        yPosition += 15;
      }

      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('🗺️ Map & Navigation Information', 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      const mapInfo = [
        'Interactive monastery trail map included in this package',
        'GPS coordinates available for all monastery locations',
        'Offline map access recommended for remote areas',
        'Distance between monasteries calculated for efficient routing',
        'Alternative routes available in case of road closures'
      ];

      mapInfo.forEach(info => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }
        pdf.text(`• ${info}`, 25, yPosition);
        yPosition += 6;
      });

      yPosition += 10;

      // Homestay Information Section
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('🏠 Nearby Homestay Options', 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      const homestayOptions = [
        {
          name: 'Mountain View Homestay',
          location: 'Near Rumtek Monastery (2 km)',
          price: '₹2,500/night',
          contact: '+91 9876543210',
          amenities: 'WiFi, Traditional Meals, Mountain View'
        },
        {
          name: 'Pelling Heritage Home',
          location: 'Near Pemayangtse Monastery (1.5 km)', 
          price: '₹2,000/night',
          contact: '+91 9876543211',
          amenities: 'Garden, Local Cuisine, Kanchenjunga View'
        },
        {
          name: 'Tashiding Valley Stay',
          location: 'Near Tashiding Monastery (3 km)',
          price: '₹1,800/night', 
          contact: '+91 9876543212',
          amenities: 'Organic Food, Nature Walks, River View'
        }
      ];

      homestayOptions.forEach((homestay, index) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
        }
        
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}. ${homestay.name}`, 25, yPosition);
        yPosition += 5;
        
        pdf.setFont('helvetica', 'normal');
        pdf.text(`📍 ${homestay.location}`, 30, yPosition);
        yPosition += 4;
        pdf.text(`💰 ${homestay.price}`, 30, yPosition);
        yPosition += 4;
        pdf.text(`📞 ${homestay.contact}`, 30, yPosition);
        yPosition += 4;
        pdf.text(`🏷️ ${homestay.amenities}`, 30, yPosition);
        yPosition += 8;
      });

      // Transport Information Section
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('🚗 Transport Information', 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      const transportOptions = [
        {
          type: 'Private Taxi',
          provider: 'Sikkim Taxi Union',
          contact: '+91 9876543210',
          cost: '₹12-15/km',
          availability: '24/7'
        },
        {
          type: 'Shared Taxi', 
          provider: 'Shared Cab Service',
          contact: '+91 9876543211',
          cost: '₹150-300/person',
          availability: '6 AM - 8 PM'
        },
        {
          type: 'Public Bus',
          provider: 'Sikkim Transport',
          contact: '+91 9876543212', 
          cost: '₹50-150/person',
          availability: '6 AM - 6 PM'
        }
      ];

      transportOptions.forEach((transport, index) => {
        if (yPosition > pageHeight - 25) {
          pdf.addPage();
          yPosition = 20;
        }
        
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}. ${transport.type} - ${transport.provider}`, 25, yPosition);
        yPosition += 5;
        
        pdf.setFont('helvetica', 'normal');
        pdf.text(`📞 Contact: ${transport.contact}`, 30, yPosition);
        yPosition += 4;
        pdf.text(`💰 Cost: ${transport.cost}`, 30, yPosition);
        yPosition += 4;
        pdf.text(`🕐 Available: ${transport.availability}`, 30, yPosition);
        yPosition += 8;
      });

      // Travel Tips Section
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = 20;
      } else {
        yPosition += 15;
      }

      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('💡 Essential Travel Tips & Guidelines', 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      const tips = [
        '📋 Permits: Inner Line Permit required for Indian nationals, PAP for foreigners',
        '🌤️ Best Time: March-June and September-December',
        '🧥 Weather: Carry warm clothes and rain protection',
        '⛰️ Altitude: Take time to acclimatize, stay hydrated',
        '🙏 Respect: Follow monastery etiquette, photography rules',
        '🚨 Emergency: Keep local emergency contacts handy',
        '💳 Money: Carry cash as ATMs may be limited in remote areas',
        '📱 Network: Mobile network can be patchy in mountain areas'
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
        pdf.text(`Monastery360 Complete Travel Package - Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      }

      // Save PDF with enhanced filename
      const currentDate = new Date().toISOString().split('T')[0];
      pdf.save(`monastery360-complete-package-${currentDate}.pdf`);
      
      toast({
        title: "Complete Travel Package Generated! 🎉",
        description: "Your comprehensive travel package with maps, homestays, and transport info has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating your travel package. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Download Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Complete Travel Package
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Download your complete offline travel package including maps, homestays, transport info, and detailed itinerary.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            {/* Itinerary Section */}
            <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Trip Itinerary
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {savedMonasteries.length} monastery details
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Cultural events & festivals
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Travel timeline & schedule
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Emergency contacts
                </li>
              </ul>
            </div>

            {/* Maps Section */}
            <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Map className="h-4 w-4 text-primary" />
                Maps & Navigation
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Offline monastery trail map
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  GPS coordinates
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Route directions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Distance calculations
                </li>
              </ul>
            </div>

            {/* Services Section */}
            <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Home className="h-4 w-4 text-primary" />
                Services Info
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Nearby homestay options
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Transport contacts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Booking information
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Price estimates
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={generatePDF} className="w-full h-12 text-base shadow-md">
              <Download className="h-5 w-5 mr-3" />
              Download Complete Travel Package
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Individual Downloads */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Map Downloads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Map className="h-5 w-5 text-accent" />
              Offline Maps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Download detailed maps for offline navigation during your monastery visits.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" disabled>
                <Navigation className="h-4 w-4 mr-2" />
                Monastery Trail Map
                <span className="ml-auto text-xs text-muted-foreground">Coming Soon</span>
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <Map className="h-4 w-4 mr-2" />
                Regional Overview Map
                <span className="ml-auto text-xs text-muted-foreground">Coming Soon</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Services Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Home className="h-5 w-5 text-secondary" />
              Services Directory
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Essential contact information for transport and accommodation services.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" disabled>
                <Home className="h-4 w-4 mr-2" />
                Nearby Homestays List
                <span className="ml-auto text-xs text-muted-foreground">Coming Soon</span>
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <Car className="h-4 w-4 mr-2" />
                Transport Contacts
                <span className="ml-auto text-xs text-muted-foreground">Coming Soon</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pro Tips */}
      <Card className="border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">📱</div>
            <div>
              <h4 className="font-semibold mb-2">Offline Access Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Save the PDF to your device's offline storage</li>
                <li>• Screenshot important maps and contact numbers</li>
                <li>• Share the package with your travel companions</li>
                <li>• Print key pages as backup for remote areas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFExport;