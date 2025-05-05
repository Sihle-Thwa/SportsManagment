// src/components/layout/Header.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import {  Home } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-2">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Home className="h-4 w-4 mr-1" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        
        {/* Optional: Page-specific actions */}
        <div className="space-x-2">
          {/* You can add page-specific action buttons here */}
        </div>
      </div>
    </div>
  );
};

export default Header;