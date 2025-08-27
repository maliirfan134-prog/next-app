import Image from "next/image";

export default function ServicesPage() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Services</h2>

      <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden text-center">
        <Image width={180} height={180} src={"/images/story.jpg"} alt="ddd" />
        <div className="p-5">
          <h3 className="text-xl font-semibold mb-2">
            Laibray Management 
          </h3>
          <p className="text-gray-600 mb-4">
            Waste management systems provide services such as waste collection
            and transportation from homes, businesses, and industries.
          </p>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded">
            More information
          </button>
        </div>
      </div>
    </div>
  );
}
