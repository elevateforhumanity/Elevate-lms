import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Images | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

export default function TestImagesPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Image Test Page</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Cash Bills Image</h2>
          <img 
            src="/images/heroes/cash-bills.jpg" 
            alt="Cash Bills"
            className="w-full max-w-2xl h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Hero Main Image</h2>
          <img 
            src="/og-default.jpg" 
            alt="Hero Main"
            className="w-full max-w-2xl h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Business Hero Image</h2>
          <img 
            src="/images/pathways/business-hero.jpg" 
            alt="Business Hero"
            className="w-full max-w-2xl h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Business Professional Image</h2>
          <img 
            src="/images/business/professional-2.jpg" 
            alt="Professional"
            className="w-full max-w-2xl h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
