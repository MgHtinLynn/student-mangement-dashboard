import {
    AdjustmentsHorizontalIcon,
    ClockIcon,
    CreditCardIcon,
    HomeIcon,
    ScaleIcon,
    UserGroupIcon
} from "@heroicons/react/24/outline";

export const mainNavigation = [
    {name: 'Home', href: '/dashboard', icon: HomeIcon, current: true},
    {name: 'Users', href: '/users', icon: UserGroupIcon, current: false},
    {name: 'Role', href: '/roles', icon: ClockIcon, current: false},
    {name: 'Exam Result', href: '/exam-result', icon: ScaleIcon, current: false},
    {name: 'Transcript', href: '/transcript', icon: CreditCardIcon, current: false},
    {name: 'Certificate', href: '/certificate', icon: CreditCardIcon, current: false},
    {name: 'Attendance', href: '/attendance', icon: UserGroupIcon, current: false},
    {name: 'Rating', href: '/rating', icon: AdjustmentsHorizontalIcon, current: false},
    {name: 'Assignment', href: '/assignment', icon: AdjustmentsHorizontalIcon, current: false},
    {name: 'Resource', href: '/resource', icon: AdjustmentsHorizontalIcon, current: false},
    {name: 'Lecture', href: '/lectures', icon: AdjustmentsHorizontalIcon, current: false},
    {name: 'Subject', href: '/subjects', icon: AdjustmentsHorizontalIcon, current: false},
]