import { footerRoutesLinks } from "@/constants";
import Link from "next/link";

const FooterLinks = () => {
  return (
    <div className="flex flex-row flex-wrap gap-3">
      <Link
        className="flex w-max items-center justify-center px-2 hover:underline"
        href="/all-forms"
      >
        All GECs
      </Link>

      {footerRoutesLinks.map((item) => (
        <Link
          className="flex w-max items-center justify-center border-l-2 px-2 hover:underline"
          key={item.label}
          href={item.route}
        >
          {item.label}
        </Link>
      ))}
      
    </div>
  );
};

export default FooterLinks;
