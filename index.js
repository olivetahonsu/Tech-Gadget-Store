
// List of available product types.
// ****************************************************************

var products = [
    {
        index: 1,
        id: 'p1',
        name: 'Samsung TV',
        price: 500000,
    },

    {
        index: 2,
        id: 'p2',
        name: 'Pixel 4a',
        price: 250000,
    },

    {
        index: 3,
        id: 'p3',
        name: 'PS 5',
        price: 300000,
    },

    {
        index: 4,
        id: 'p4',
        name: 'MacBook Air',
        price: 800000,
    },

    {
        index: 5,
        id: 'p5',
        name: 'Apple Watch',
        price: 95000,
    },

    {
        index: 6,
        id: 'p6',
        name: 'Air Pods',
        price: 75000,
    }
    
];


// THE CODES BELOW ARE SEPARATED INTO PARTS BASED ON WHAT THEY DO.
//****************************************************************************************
//****************************************************************************************



// PART 1: These are responsible for the reactions to hovering on the images of the products.

var productImg = document.querySelectorAll('.product_image'); //Grabbing all the product images based on the class they belong to.

var productPrice = document.querySelectorAll('.product_price'); //Grabbing all the product prices based on the class they belong to

var priceText = document.querySelectorAll('.price_text'); //Grabbing the elements with the text 'Price'.


for(let i = 0; i < productImg.length; i++) {

    //Adding event listeners to each of the product images.

productImg[i].addEventListener('mouseover', mouseOverHandler);

productImg[i].addEventListener('mouseout', mouseOutHandler);


// A function to handle the 'mouse-over events

function mouseOverHandler(){

    var iD = productImg[i].getAttribute('id');

    if(iD == products[i].id){

        priceText[i].innerHTML = 'Price';
        
        productPrice[i].innerHTML = 'N'+ products[i].price.toLocaleString('en-US');
     
        productImg[i].style.filter = 'brightness(0.35)';
       
         };
    };


// A function to handle the mouse-out events.

function mouseOutHandler(){
    
    var iD = productImg[i].getAttribute('id');

    if(iD == products[i].id){

        priceText[i].innerHTML = '';
        
        productPrice[i].innerHTML = '';
     
        productImg[i].style.filter = 'brightness(1)';
       
         };

    };

};



// PART 2: This part is responsible for adding item to and removing items from the cart.

var productButton = document.querySelectorAll('.product_btn'); //Grabbing all the product button elements

var myTable = document.querySelector('.table'); //Grabbing the table created for the cart items


var count = 0; //A variable the count the items in the cart.


for (let i = 0; i < productButton.length; i++){

productButton[i].addEventListener('click',action); // Adding an event listener to the the product button elements.


//A function to handle the click events on the product buttons.
function action(){

    if(productButton[i].innerHTML === 'ADD TO CART'){

    // First clicking of the product button will perform the action below.
    productButton[i].innerHTML = 'REMOVE FROM CART';
    productButton[i].style.backgroundColor = '#ffe9d6';
    
    count += 1;	

    setData(i); // Storing cart items to the localStorage.
    getData(i); // Getting the stored data to serve the cart
   
    }

    else{

        // Second clicking will perform the action below.
        productButton[i].innerHTML = 'ADD TO CART';
        productButton[i].style.backgroundColor = '#ff7a00';
         
        count -= 1;

       
        removeData(i); //Removing items both from the localStorage and the cart.
        
        };

        document.getElementById('cart_text').innerHTML = count;

        // If there is an item in the cart, the table will be displayed.
       if(myTable.style.display === 'none'){
            myTable.style.display = ''; 
        }

        // If there are no items in the cart, the table will not be displayed.
        if(count === 0){
            myTable.style.display = 'none';
         }

     };  
        
};



//PART 3: Declaring functions to store, retrieve and remove items from the localStorage and the cart.
let local = localStorage;


// A function declaration to handle creating and storing items in the localStorage when the product button is clicked
setData = (i)=>{
    let data = {
        count: count,
        name : products[i].name,
        price : products[i].price,
    }

    local.setItem(products[i].name, JSON.stringify(data));
}


/* A function declaration to handle the retrieval of items from the localStorage, 
create rows in the table and serving the items to the rows of the table in the cart.*/

 getData = (i)=>{
    let data = local.getItem(products[i].name);
    data = JSON.parse(data);

    var tableRow = document.createElement('tr');    
    myTable.appendChild(tableRow);

    tableRow.setAttribute('id', products[i].name);

    var itemNumber = document.createElement('td');
    var itemName = document.createElement('td');
    var itemPrice = document.createElement('td');
    var decButton = document.createElement('button');
    var qValue = document.createElement('span');
    var inButton = document.createElement('button');
    var removeButton = document.createElement('button');

    decButton.classList.add('dec_button');
    inButton.classList.add('inc_button');
    inButton.setAttribute('name', data.name);
    qValue.classList.add('item_quantity');

    removeButton.classList.add('remBtn');
    tableRow.classList.add('cart_item');

   	
    tableRow.append(itemNumber, itemName, itemPrice, decButton, qValue, inButton, removeButton);

    itemNumber.innerHTML = data.count;    
    itemName.innerHTML = data.name;
    itemPrice.innerHTML = data.price;

    var quantity = 1

    decButton.textContent = '-';
    qValue.innerHTML = quantity;
    inButton.textContent = '+';
    removeButton.textContent = 'Remove';

    
    cartItems = document.querySelectorAll('.cart_item'); // Grabbing the cart items
    removeBtn = document.querySelectorAll('.remBtn'); // Grabbing the buttons of the cart items

    for(var i = 0; i < removeBtn.length; i++) {

        if(cartItems[i].id === data.name) {
    
        removeBtn[i].addEventListener('click', (e) => {

        carty = document.getElementById(data.name);

        carty.remove();

        count -= 1;
      
        document.getElementById('cart_text').innerHTML = count;

        changeAttribute(); // Function call to change product button attribute when an item is removed from the cart.

        });
    }
}


/* A function declaration to change the attributes of a specific 
product button when it's item is removed from the cart */

function changeAttribute(){
    pBtn = document.getElementsByClassName('product_btn');

    for(var i = 0; i < pBtn.length; i++) {  

        if(pBtn[i].name === data.name) {

            pBtn[i].innerHTML = 'ADD TO CART';
            pBtn[i].style.backgroundColor = '#ff7a00';
        }
    }
}



/* A function declaration to remove items from both the cart and 
the localStorage */

removeData = (i)=>{
    
    var dataItem = products[i].name;

    local.removeItem(dataItem);

    var itemName = document.getElementById(dataItem);

    itemName.remove();   
}	


var itemQuantity = document.querySelectorAll('.item_quantity');
var increment = document.querySelectorAll('.inc_button');
var decrement = document.querySelectorAll('.dec_button');


for (var i=0; i<cartItems.length; i++) {
    if(cartItems[i].id === data.name) {
    increment[i].addEventListener('click', (e)=>{
        console.log('increment clicked', data.name);
        quantity += 1;
        qValue.innerHTML = quantity;
        });
    }
}


for (var i=0; i<decrement.length; i++){

    if(cartItems[i].id === data.name) {

    decrement[i].addEventListener('click', (e)=>{
      
        quantity -= 1;
        qValue.innerHTML = quantity;

        if(quantity === 0){

            changeAttribute();

            carty = document.getElementById(data.name);

            carty.remove();

            count -= 1;

            document.getElementById('cart_text').innerHTML = count;
            
        }

        });
    }
}




// Grabbing the cart container
var cartContainer = document.querySelector('.cart_container');

// Grabbing the modal button
var modalBtn = document.querySelector('.modalBtn');

modalBtn.addEventListener('click', (e)=>{
    cartContainer.classList.add('cart_active');
});

//Grabbing the checkout button
var checkOut = document.querySelector('#checkout');

checkOut.addEventListener('click', (e)=>{
    cartContainer.classList.remove('cart_active');
    });
}







