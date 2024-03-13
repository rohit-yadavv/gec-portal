import { footerRoutesLinks } from "@/constants";
import Link from "next/link";

const FooterLinks = () => {
  return (
    <div className="flex w-full  flex-row flex-wrap items-center justify-center gap-3">
      <Link
        className="flex w-max items-center justify-center px-2 hover:underline"
        href="/all-forms"
      >
        All GECs
      </Link>

      {footerRoutesLinks.map((item) => (
        <Link
          className="flex w-max items-center justify-center px-2 hover:underline sm:border-l-2"
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
