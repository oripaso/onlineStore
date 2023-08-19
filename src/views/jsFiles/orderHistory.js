var userCarts;
$.ajax({
    url: '/orderHistory',
    method: 'POST',
    data: JSON.stringify({
      username:sessionStorage.getItem('name'),
    }),
    contentType: 'application/json',

    success: function(res) {

        userCarts = res;
        displayOrders(userCarts);  
         
    }
})
$('.home-page').click(function() {
    location.href = '/mainPage'
})


function displayOrders(carts){
    var cardContainer = $('.container');
    var totalPrice = 0;

    for (var i = 0; i < carts.length; i++) {
        var cart = carts[i];
        totalPrice += cart.price;
        console.log(cart.products);
        

     

        var price = $('<h4>').addClass('card-title').text('Total price: $'+cart.price); 

        var dateTimeString = cart.created;
         //// transform from yyyy/dd/mm  to  dd/mm/yyyy
        var dateOnly = dateTimeString.split('T')[0].split('-');
        var errangedDateFormat = `${dateOnly[2]}-${dateOnly[1]}-${dateOnly[0]}`;

        var date = $('<h4>').addClass('card-title').text('Date: '+errangedDateFormat);

        // var card = $('<div>').addClass('card');
        var cardRow = $('<div>').addClass('row');
        var colLeft = $('<div>').addClass('col left');
        var colRight = $('<div>').addClass('col right');
        colLeft.append(date,price);

        var productsArray = cart.products;
        var productList = $('<ul>').addClass('list-group');
        
        ////////  cardData.products[i] ==== products array inside cart[i]
        //////  cardData = cart,
        for(var j=0; j<productsArray.length; j++){  
            var product = $('<li>').addClass('list-group-item').text(productsArray[j]);
            productList.append(product);
        }
        colRight.append(productList);
        
        cardRow.append(colLeft,colRight);
        cardContainer.append(cardRow);
    }
    $(".total-price").text('Total: '+'$'+totalPrice);
}