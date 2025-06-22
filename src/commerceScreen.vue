<template>

    <div class="container">
        <div>
            <audio controls>
                <source :src="audioSrc" type="audio/mpeg" />
            </audio>
        </div>

        <div>
            <video controls width="600">
                <source :src="videoSrc" type="video/mp4" />
            </video>
        </div>

        <div>
            <img :src="imageSrc" alt="description d'image vue.js" />
        </div>

        <h1>Boutique Vue.js</h1>

        <!-- liste des produits -->
        <div class="products">
            <h2>Produits</h2>
            <div class="a">
                <div v-for="product in products" :key="product.id" class="product-card">
                    <h3>{{ product.name }}</h3>
                    <p>Prix : {{ product.price }} $</p>
                    <button @click="addToCart(product)">Ajouter au panier</button>
                </div>
            </div>
        </div>

        <!-- Panier -->
        <div class="cart">
            <h2>Panier</h2>
            <div v-if="cart.length === 0">Ton panier est vide :(</div>
            <ul v-else>
                <li v-for="(item, index) in cart" :key="index" class="cart-item">
                    <div>
                        {{ item.name }} - {{ item.price }} $ x {{ item.quantity }}
                    </div>
                    <div class="actions">
                        <button @click="increaseQuantity(index)">+</button>
                        <button @click="decreaseQuantity(index)">-</button>
                        <button @click="removeFromCart(index)">Supprimer</button>
                    </div>
                </li>
            </ul>
            <div v-if="cart.length > 0" class="b">
                <p>Total : {{ totalPrice }} $</p>
            </div>
        </div>
    </div>
</template>

<script setup>

import { computed, ref } from 'vue';
import audioSrc from '@/components/audioScreen.mp3';
import videoSrc from '@/components/screenRecord.mp4';
import imageSrc from '@/components/apps.jpg';

const products = ref([
    { id: 1, name: 'Mug OTL', price: 20 },
    { id: 2, name: 'Cahier OTL', price: 12 },
    { id: 3, name: 'Polo OTL', price: 18 },
])

// Panier
const cart = ref([])

// Ajouter au panier
const addToCart = (product) => {
    const existingItem = cart.value.find(item => item.id === product.id)

    if (existingItem) {
        existingItem.quantity += 1
    } else {
        cart.value.push({ ...product, quantity: 1 })
    }
}

//Supprimer du panier
const removeFromCart = (index) => {
    cart.value.splice(index, 1)
}

//Augmenter la quantite d'un element
const increaseQuantity = (index) => {
    cart.value[index].quantity += 1
}

//Diminuer la quantite
const decreaseQuantity = (index) => {
    if (cart.value[index].quantity > 1) {
        cart.value[index].quantity -= 1
    } else {
        cart.value.splice(index, 1)
    }
}


//Calcul du total
const totalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
})
</script>

<style>
body {
    background-color: rgb(48, 48, 48);
    color: white;
}

.container {
    font-family: Arial, Helvetica, sans-serif;
    max-width: 800px;
    margin: auto;
    padding: 12px;
}

video{
    border: 2px solid white;
}

img {
    width: 200px;
    height: 120px;
}

h1 {
    color: rgb(247, 182, 63);
}

.products {
    display: flex;
    flex-direction: column;
}

.product-card {
    display: flex;
    flex-direction: column;
    border: 2px solid rgb(247, 247, 114);
    padding: 16px;
}

.a {
    display: flex;
    flex-direction: row;
    gap: 16px;
}

button {
    background-color: rgb(247, 182, 63);
    color: white;
    border: none;
    border-radius: 16px;
    width: 120px;
    height: 24px;
    padding: 4px;
}

button:hover {
    cursor: pointer;
    background-color: rgb(252, 179, 44);
}

ul {
    list-style: none;

}

li {
    margin: 8px;
    padding: 8px;
    border: 1px solid rgb(247, 247, 114);
}

.b p {
    color: rgb(252, 179, 44);
    font-size: 24px;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.actions button {
    margin-left: 4px;
}
</style>