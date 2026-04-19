import fs from 'fs';
import path from 'path';

export interface Product {
    id: string;
    nom: string;
    prix: number;
    devise: string;
    categorie: string;
    commentaire: string;
    recit: string;
}

/**
 * SERVICE CATALOGUE
 * Singleton pour gérer l'accès efficace aux données produits.
 */
export class CatalogService {
    private static instance: CatalogService;
    private products: Product[] = [];
    private catalogPath = path.join(process.cwd(), 'config/catalog-produits.json');

    private constructor() {
        this.loadCatalog();
    }

    public static getInstance(): CatalogService {
        if (!CatalogService.instance) {
            CatalogService.instance = new CatalogService();
        }
        return CatalogService.instance;
    }

    private loadCatalog() {
        try {
            const data = fs.readFileSync(this.catalogPath, 'utf8');
            this.products = JSON.parse(data);
            console.log(`[Catalog] ${this.products.length} produits chargés.`);
        } catch (error) {
            console.error("[Catalog] Erreur chargement catalogue:", error);
            this.products = [];
        }
    }

    /**
     * Recherche textuelle simple pour filtrer avant l'IA
     */
    public search(query: string, limit = 10): Product[] {
        const keywords = query.toLowerCase().split(' ');
        return this.products
            .filter(p => {
                const searchStr = `${p.nom} ${p.categorie} ${p.commentaire}`.toLowerCase();
                return keywords.some(k => searchStr.includes(k));
            })
            .slice(0, limit);
    }

    /**
     * Retourne tout le catalogue (à utiliser avec parcimonie)
     */
    public getAll(): Product[] {
        return this.products;
    }

    /**
     * Vérifie si un produit existe avec le bon prix
     */
    public validate(name: string, price: number): boolean {
        return this.products.some(p => 
            p.nom.toLowerCase() === name.toLowerCase() && p.prix === price
        );
    }
}
