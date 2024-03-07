export interface HomeFiltersProps {
  filters: {
    name: string;
    value: string;
    desc:string;
  }[];
}

export interface NoResultProps {
  title: string;
  desc: string;
  link?: string;
  linkTitle?: string;
}

export interface BookMarkProps {
  userId: string;
  hasSaved: boolean;
  enrollmentId: string;
  size: number;
  formType: string;
}


export interface FormProps {
  onSubmitSuccess: () => void; 
}

