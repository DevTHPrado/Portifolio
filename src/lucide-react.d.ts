declare module 'lucide-react' {
  import * as React from 'react';
  
  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }
  
  export type Icon = React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  
  export const Sparkles: Icon;
  export const Wind: Icon;
  export const Gem: Icon;
  export const Heart: Icon;
  export const User: Icon;
  export const Users: Icon;
  export const Smile: Icon;
  export const Compass: Icon;
  export const Flame: Icon;
  export const Award: Icon;
  export const Activity: Icon;
  export const ClipboardList: Icon;
  export const Clock: Icon;
  export const CalendarCheck: Icon;
  export const Menu: Icon;
  export const X: Icon;
  export const Calendar: Icon;
  export const ArrowRight: Icon;
  export const ArrowLeft: Icon;
  export const Check: Icon;
  export const MapPin: Icon;
  export const Mail: Icon;
  export const Instagram: Icon;
  export const Phone: Icon;
  export const CheckCircle2: Icon;
  export const Star: Icon;
  export const Layers: Icon;
  export const Brain: Icon;
  export const Dumbbell: Icon;
}
