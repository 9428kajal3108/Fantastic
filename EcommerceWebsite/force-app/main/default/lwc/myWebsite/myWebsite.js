import { LightningElement, wire, track } from 'lwc';
// import getProductData from '@salesforce/apex/FirebaseRetrieval.getProductData';
import getCartItems from '@salesforce/apex/CartController.getCartItems';
import addToCart from '@salesforce/apex/CartController.addToCart';
import getProducts from '@salesforce/apex/ProductController.getProducts';
import removeFromCart from '@salesforce/apex/CartController.removeFromCart';
import { refreshApex } from '@salesforce/apex';
import fetchProductDetails from '@salesforce/apex/CartController.fetchProductDetails';


import HERO from '@salesforce/resourceUrl/Fantastic_hero'; 
import F1 from '@salesforce/resourceUrl/Fantastic_f1'; 
import F2 from '@salesforce/resourceUrl/Fantastic_f2'; 
import F3 from '@salesforce/resourceUrl/Fantastic_f3'; 
import F4 from '@salesforce/resourceUrl/Fantastic_f4'; 
import F5 from '@salesforce/resourceUrl/Fantastic_f5'; 
import SERVICE from '@salesforce/resourceUrl/Fantastic_serviceBanner'; 
import LARGEBANNER1 from '@salesforce/resourceUrl/Fantastic_largeBanner1'; 
import LARGEBANNER2 from '@salesforce/resourceUrl/Fantastic_largeBanner2'; 
import SMALLBANNER1 from '@salesforce/resourceUrl/Fantastic_smallBanner1'; 
import SMALLBANNER2 from '@salesforce/resourceUrl/Fantastic_smallBanner2'; 
import SMALLBANNER3 from '@salesforce/resourceUrl/Fantastic_smallBanner3'; 
import SHOPBANNER from '@salesforce/resourceUrl/Fantastic_shopBanner'; 
import ABOUTBANNER from '@salesforce/resourceUrl/Fantastic_aboutBanner'; 
import ABOUTMAIN from '@salesforce/resourceUrl/Fantastic_aboutMain';
import BLOGBANNER from '@salesforce/resourceUrl/Fantastic_blogBanner';
import BLOG1 from '@salesforce/resourceUrl/Fantastic_blog1';
import BLOG2 from '@salesforce/resourceUrl/Fantastic_blog2';
import BLOG3 from '@salesforce/resourceUrl/Fantastic_blog3';
import BLOG4 from '@salesforce/resourceUrl/Fantastic_blog4';
import BLOG5 from '@salesforce/resourceUrl/Fantastic_blog5';
import BLOG6 from '@salesforce/resourceUrl/Fantastic_blog6';
import CARTBANNER from '@salesforce/resourceUrl/Fantastic_cartBanner';


export default class MyWebsite extends LightningElement {
    @track f1ImgUrl = F1;
    @track f2ImgUrl = F2;
    @track f3ImgUrl = F3;
    @track f4ImgUrl = F4;
    @track f5ImgUrl = F5;
    @track  heroUrl = HERO;
    @track serviceUrl = SERVICE;
    @track large1Url = LARGEBANNER1;
    @track large2Url = LARGEBANNER2;
    @track small1Url = SMALLBANNER1;
    @track small2Url = SMALLBANNER2;
    @track small3Url = SMALLBANNER3;
    @track shopBanner = SHOPBANNER;
    @track aboutBanner = ABOUTBANNER;
    @track aboutMain = ABOUTMAIN;
    @track blogBanner = BLOGBANNER;
    @track blog1 = BLOG1;
    @track blog2 = BLOG2;
    @track blog3 = BLOG3;
    @track blog4 = BLOG4;
    @track blog5 = BLOG5;
    @track blog6 = BLOG6;
    @track cartBanner = CARTBANNER;

    get backgroundStyle() {
        return `background-image: url(${this.heroUrl}); background-size: cover; background-position: top 25% right 0;`;
    }
    get backgroundService() {
        return `background-image: url(${this.serviceUrl});  background-size: cover; background-position: center;`;
    }
    get backgroundLarge1() {
        return `background-image: url(${this.large1Url});  background-size: cover; background-position: center; min-width: 600px; display: flex;flex-direction: column;justify-content: center;align-items: flex-start; height: 50vh; padding: 30px`;
    }
    get backgroundLarge2() {
        return `background-image: url(${this.large2Url});  background-size: cover;
        background-position: center; min-width: 600px; display: flex;flex-direction: column;justify-content: center;align-items: flex-start; height: 50vh; padding: 30px`;
    }

    get backgroundSmall1() {
        return `background-image: url(${this.small1Url}); display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        min-width: 400px;
        height: 30vh;
        background-size: cover;
        background-position: center;
        padding: 20px;
        margin-bottom: 20px;`;
    }
    get backgroundSmall2() {
        return `background-image: url(${this.small2Url}); display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        min-width: 400px;
        height: 30vh;
        background-size: cover;
        background-position: center;
        padding: 20px;
        margin-bottom: 20px;`;
    }
    get backgroundSmall3() {
        return `background-image: url(${this.small3Url}); display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        min-width: 400px;
        height: 30vh;
        background-size: cover;
        background-position: center;
        padding: 20px;
        margin-bottom: 20px;`;
    }

    get backgroundShopBanner(){
        return `background-image: url(${this.shopBanner});`;
    }
    
    get backgroundAboutBanner(){
        return `background-image: url(${this.aboutBanner});`;
    }
    get backgroundBlogPage(){
        return `background-image: url(${this.blogBanner});`;
    }
    get backgroundCartBanner(){
        return `background-image: url(${this.cartBanner});`;
    }


    activePage = ''; // Initialize with current active page
    homeText = 'Home';
    shopText = 'Shop';
    aboutText = 'About';
    blogText = 'Blog';
    heroSubtitle = 'Get Your Collection';
    heroTitle = 'Super deals on Fashion';
    heroSubtitle2 = 'On all Product';
    heroDescription = 'Save more with coupons $ up to 70% off!';
    shopNowText = 'Shop Now';
    featuredProductTitle = 'Featured Product';
    featuredProductDescription = 'Summer Collection with New Design';

    @track showFirstDiv = true;
    @track showSecondDiv = false;
    @track showThirdDiv = false;
    @track showFourDiv = false;
    @track showFifthPage = false;

    showShopPage() {
        this.showFirstDiv = false;
        this.showSecondDiv = true;
        this.showThirdDiv = false;
        this.showFourDiv = false;
        this.showFifthPage = false;
    }

    showHomePage(){
        this.showFirstDiv = true;
        this.showSecondDiv = false;
        this.showThirdDiv = false;
        this.showFourDiv = false;
        this.showFifthPage = false;
    }

    showAboutPage(){
        this.showFirstDiv = false;
        this.showSecondDiv = false;
        this.showThirdDiv = true;
        this.showFourDiv = false;
        this.showFifthPage = false;
    }

    showBlogPage(){
        this.showFirstDiv = false;
        this.showSecondDiv = false;
        this.showThirdDiv = false;
        this.showFourDiv = true;
        this.showFifthPage = false;

    }
    showCartPage(){
        this.showFirstDiv = false;
        this.showSecondDiv = false;
        this.showThirdDiv = false;
        this.showFourDiv = false;
        this.showFifthPage = true;
    }

    @track products;

    @wire(getProducts)
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data;
        } else if (error) {
            console.error('Error fetching products: ', error);
        }
    }


    @track cartItems;

    @wire(getCartItems)
    wiredCartItems(result) {
        if (result.data) {
            this.cartItems = result.data.map(item => ({
                Id: item.Id,
                ImageUrl: item.Product_Image__c,
                ProductName: item.Name,
                Price: item.Product_Price__c
            }));
        } else if (result.error) {
            console.error('Error fetching cart items:', result.error);
        }
    }

    fetchProductDetails(productId) {
        fetchProductDetails({ productId })
            .then(result => {
                this.products = result;
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }

    addToCartHandler(event) {
        const productId = event.currentTarget.dataset.id;
        const product = this.products.find(item => item.Id === productId);
        if (product) {
            addToCart({
                productId: productId,
                productName: product.Product_Title__c,
                imageUrl: product.ImageUrl__c,
                price: product.Product_Price__c
            })
            .then(() => {
                return refreshApex(this.wiredCartItems);
            })
            .catch(error => {
                console.error('Error adding item to cart:', error);
            });
        }
    }

    removeFromCartHandler(event) {
        const cartItemId = event.target.dataset.cartItemId;
        removeFromCart({ cartItemId })
            .then(() => {
                this.cartItems = this.cartItems.filter(item => item.Id !== cartItemId);
            })
            .catch(error => {
                console.error('Error removing from cart:', error);
            });
    }



    @track subtotal = 0;
    @track total = 0;
    @track error;
    modalVisible = false;


    @wire(getCartItems)
    wiredCart({ error, data }) {
        if (data) {
            this.subtotal = this.calculateSubtotal(data);

            this.total = this.subtotal + 15;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.subtotal = 0;
            this.total = 0;
        }
    }

    calculateSubtotal(cart) {
        let subtotal = 0;
        for (let item of cart) {
            subtotal += item.Product_Price__c; 
        }
        return subtotal;
    }

    handlePlaceOrder() {
        if (this.subtotal > 0) {
          this.modalVisible = true;
        } else {
             console.log('Cannot place order. Cart is empty.');
        }
    }

    handleCloseModal() {
        this.modalVisible = false;
    }

    get modalStyle() {
        return this.modalVisible ? 'display: block; border: 1px solid grey;' : 'display: none;';
    }
    
    
    
}
