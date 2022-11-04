import {
    AdjustmentsHorizontalIcon,
    ClockIcon,
    CreditCardIcon,
    HomeIcon,
    ScaleIcon,
    UserGroupIcon
} from "@heroicons/react/24/outline";

export const mainNavigation = [
    {name: 'Home', href: '/dashboard', icon: HomeIcon, current: true, permission: ["*"]},
    {name: 'Users', href: '/users', icon: UserGroupIcon, current: false, permission: ["admin"]},
    {name: 'Role', href: '/roles', icon: ClockIcon, current: false, permission: ["admin"]},
    {name: 'Exam Result', href: '/exam-result', icon: ScaleIcon, current: false, permission: ["*"]},
    {name: 'Transcript', href: '/transcript', icon: CreditCardIcon, current: false, permission: ["*"]},
    {name: 'Certificate', href: '/certificate', icon: CreditCardIcon, current: false, permission: ["*"]},
    {name: 'Attendance', href: '/attendance', icon: UserGroupIcon, current: false, permission: ["*"]},
    {name: 'Rating', href: '/rating', icon: AdjustmentsHorizontalIcon, current: false, permission: ["*"]},
    {name: 'Assignment', href: '/assignment', icon: AdjustmentsHorizontalIcon, current: false, permission: ["*"]},
    {name: 'Resource', href: '/resource', icon: AdjustmentsHorizontalIcon, current: false, permission: ["*"]},
    {name: 'Lecture', href: '/lectures', icon: AdjustmentsHorizontalIcon, current: false, permission: ["admin"]},
    {name: 'Subject', href: '/subjects', icon: AdjustmentsHorizontalIcon, current: false, permission: ["admin"]},
]