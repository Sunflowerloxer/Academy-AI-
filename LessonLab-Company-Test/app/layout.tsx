import './globals.css';
import type { Metadata } from 'next';
export const metadata:Metadata={title:'LessonLab — Activity Builder',description:'Create engaging classroom activities with AI.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
