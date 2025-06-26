import { Product } from '../types/Product';

const MONGODB_URI = "mongodb+srv://udoygtender:udoygtender@cluster0.ehviqoq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASE_NAME = "maruti_udyog";
const COLLECTION_NAME = "tenders";

// Note: In a production environment, you would typically have a backend API
// For this demo, we'll simulate database operations with localStorage
// In real implementation, these would be API calls to your backend

class DatabaseService {
  private getStorageKey() {
    return 'maruti_udyog_tenders';
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const stored = localStorage.getItem(this.getStorageKey());
      if (stored) {
        const products = JSON.parse(stored);
        return products.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt)
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async addProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    try {
      const newProduct: Product = {
        ...product,
        id: Date.now().toString(),
        createdAt: new Date(),
        contactEmail: 'mudyogltd@gmail.com' // Set default contact email
      };

      const existingProducts = await this.getAllProducts();
      const updatedProducts = [newProduct, ...existingProducts];
      
      localStorage.setItem(this.getStorageKey(), JSON.stringify(updatedProducts));
      
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    try {
      const products = await this.getAllProducts();
      const index = products.findIndex(p => p.id === id);
      
      if (index === -1) {
        return null;
      }

      products[index] = { ...products[index], ...updates };
      localStorage.setItem(this.getStorageKey(), JSON.stringify(products));
      
      return products[index];
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const products = await this.getAllProducts();
      const filteredProducts = products.filter(p => p.id !== id);
      
      localStorage.setItem(this.getStorageKey(), JSON.stringify(filteredProducts));
      
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }

  // Method to initialize with MongoDB connection (for future backend implementation)
  async connectToMongoDB() {
    // This would be implemented in your backend
    console.log('MongoDB URI configured:', MONGODB_URI);
    console.log('Database:', DATABASE_NAME);
    console.log('Collection:', COLLECTION_NAME);
  }
}

export const databaseService = new DatabaseService();