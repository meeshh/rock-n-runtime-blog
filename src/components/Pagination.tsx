import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
}) => {
  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageLinks.push(i);
    } else if (pageLinks[pageLinks.length - 1] !== "...") {
      pageLinks.push("...");
    }
  }

  return (
    <div className="flex justify-between mt-4">
      {currentPage > 1 ? (
        <Link
          href={`?page=${currentPage - 1}`}
          className="hover:text-blue-600"
        >
          Previous
        </Link>
      ) : (
        <span className="text-gray-400 cursor-not-allowed">Previous</span>
      )}

      <div className="flex gap-2">
        {pageLinks.map((link, index) => (
          <span key={index}>
            {link === "..." ? (
              <span className="text-gray-400">{link}</span>
            ) : (
              <Link
                href={`?page=${link}`}
                className={`hover:text-blue-600 ${
                  link === currentPage ? "font-bold text-blue-700" : ""
                }`}
              >
                {link}
              </Link>
            )}
          </span>
        ))}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={`?page=${currentPage + 1}`}
          className="hover:text-blue-600"
        >
          Next
        </Link>
      ) : (
        <span className="text-gray-400 cursor-not-allowed">Next</span>
      )}
    </div>
  );
};

export default Pagination;
