"use client";

const DownloadButtons = () => {
  const items = [
    {
      label: "Annual Report",
      href: "/Annual Income.pdf",
    },
    {
      label: "Product Catalogue",
      href: "/Ripuraj Cataloug.pdf",
    },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center bg-[#1f3a42]/70 backdrop-blur-md border border-white/10 rounded-full shadow-lg p-1.5">
        {items.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-serif uppercase tracking-wide text-sm font-bold text-[#f4efe6] px-7 py-4 rounded-full whitespace-nowrap hover:bg-white/10 transition-colors duration-200 ${
              index > 0 ? "border-l border-white/20" : ""
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default DownloadButtons;