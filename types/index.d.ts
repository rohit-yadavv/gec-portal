export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface FooterRoutesLink {
  route: string;
  label: string;
}

export interface TeamDetail {
  imgUrl: string;
  name: string;
  role: string;
  designation: string;
}