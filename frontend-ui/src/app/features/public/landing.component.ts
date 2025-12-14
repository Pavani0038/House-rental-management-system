import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Property {
  id: number;
  title: string;
  location: string;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  amenities: string[];
  available: boolean;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  
  searchQuery = {
    location: '',
    minBudget: '',
    maxBudget: '',
    bedrooms: ''
  };

  ngOnInit() {
    // Mock data - will be replaced with API call later
    this.properties = [
      {
        id: 1,
        title: 'Luxury 3BHK Apartment',
        location: 'Bangalore, Karnataka',
        rent: 25000,
        bedrooms: 3,
        bathrooms: 2,
        area: 1500,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        amenities: ['AC', 'Wi-Fi', 'Parking', 'Gym'],
        available: true
      },
      {
        id: 2,
        title: 'Cozy 2BHK Villa',
        location: 'Mumbai, Maharashtra',
        rent: 30000,
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        amenities: ['AC', 'Wi-Fi', 'Parking', 'Garden'],
        available: true
      },
      {
        id: 3,
        title: 'Modern 1BHK Flat',
        location: 'Pune, Maharashtra',
        rent: 15000,
        bedrooms: 1,
        bathrooms: 1,
        area: 650,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        amenities: ['AC', 'Wi-Fi', 'Parking'],
        available: true
      },
      {
        id: 4,
        title: 'Spacious 4BHK Penthouse',
        location: 'Delhi, NCR',
        rent: 50000,
        bedrooms: 4,
        bathrooms: 3,
        area: 2500,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        amenities: ['AC', 'Wi-Fi', 'Parking', 'Gym', 'Pool'],
        available: true
      },
      {
        id: 5,
        title: 'Affordable 2BHK Home',
        location: 'Hyderabad, Telangana',
        rent: 18000,
        bedrooms: 2,
        bathrooms: 1,
        area: 950,
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
        amenities: ['Wi-Fi', 'Parking'],
        available: true
      },
      {
        id: 6,
        title: 'Elegant 3BHK House',
        location: 'Chennai, Tamil Nadu',
        rent: 22000,
        bedrooms: 3,
        bathrooms: 2,
        area: 1400,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        amenities: ['AC', 'Wi-Fi', 'Parking', 'Garden'],
        available: true
      }
    ];
    
    this.filteredProperties = [...this.properties];
  }

  searchProperties() {
    this.filteredProperties = this.properties.filter(property => {
      const matchesLocation = !this.searchQuery.location || 
        property.location.toLowerCase().includes(this.searchQuery.location.toLowerCase());
      
      const matchesMinBudget = !this.searchQuery.minBudget || 
        property.rent >= Number(this.searchQuery.minBudget);
      
      const matchesMaxBudget = !this.searchQuery.maxBudget || 
        property.rent <= Number(this.searchQuery.maxBudget);
      
      const matchesBedrooms = !this.searchQuery.bedrooms || 
        property.bedrooms === Number(this.searchQuery.bedrooms);

      return matchesLocation && matchesMinBudget && matchesMaxBudget && matchesBedrooms;
    });
  }

  resetSearch() {
    this.searchQuery = {
      location: '',
      minBudget: '',
      maxBudget: '',
      bedrooms: ''
    };
    this.filteredProperties = [...this.properties];
  }
}
