export interface SidebarLink { 
  imgURL: string;
  route: string;
  label: string;
}  

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}