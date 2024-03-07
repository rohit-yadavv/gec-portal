
export interface ApplicationStatusProps {
  hasApplied: boolean;
  isSelected: boolean;
  isRejected: boolean;
  isTeacher: boolean;
}

export interface ApplyButtonProps {
  user: any;
  isSelected: boolean;
  isRejected: boolean;
  enrollmentId: string;
  hasApplied: string;
  selected: any;
  event: any;
}

export interface ApplyButtonEventProps {
  user: any;
  event:any;
  isSelected:boolean;
  isRejected: boolean; 
  eventId: string;
  hasApplied: string; 
}

export interface CardBadgeProps{ 
  desc: string;
  value:string;
}

export interface CountCardProps{
  count: number;
  label: string;
  isFirst: boolean;
}

export interface  CourseCardProps {
  event: {
    _id: string;
    courseName: string;
    courseCode: string;
    department: string;
    teacher: string;
    desc?: string;
    eligible: string;
    sem: number;
    uploadedBy: {
      _id: string;
      name: string;
      picture: string;
      email: string;
    };
    uploadedAt: Date;
    applyBy: Date;
    selected: string[];
    rejected: string[];
    applicant: string[];
    courseCredit: number;
    seats: number;
    type: string;
  };
}

export interface DeleteFormProps{
    enrollmentId: string;
    type: string;
}

export interface EventCardProps{
  event: { 
    _id:string;
    uploadedBy: {
      _id: string;
      name: string; 
      email: string;
    };
    eventName: string;
    eventPoster?: any;
    eventDesc: string;
    department: string;
    venue: string;
    uploadedBy: string;
    applicant: string[];
    selected: string[];
    rejected: string[];
    eventTime: any;
    uploadedAt: any;
  };
}
