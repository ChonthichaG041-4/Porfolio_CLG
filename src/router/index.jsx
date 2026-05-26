import { createBrowserRouter } from 'react-router-dom'
import MainLayout     from '@/layouts/MainLayout'
import Home           from '@/pages/Home'
import Portfolio      from '@/pages/Portfolio'
import ProjectDetail  from '@/pages/ProjectDetail'
import About          from '@/pages/About'
import Contact        from '@/pages/Contact'
import Resume         from '@/pages/Resume'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true,          element: <Home /> },
      { path: 'portfolio',    element: <Portfolio /> },
      { path: 'portfolio/:slug', element: <ProjectDetail /> },
      { path: 'about',        element: <About /> },
      { path: 'contact',      element: <Contact /> },
      { path: 'resume',       element: <Resume /> },
    ],
  },
])
