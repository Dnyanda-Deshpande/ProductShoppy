function goToAddProduct()
{
    var displayForm = '';
    displayForm += '<h3>Enter Details To Add Product</h3>';
    displayForm += '<form><div class="form-group"><label><b>Product Id  :</b></label><input type="text" class="form-control" name="productId" id="productId"/></div>';
    displayForm += '<div class="form-group"><label><b>Category  :</b></label><input type="text" class="form-control"  name="category" id="category"/></div>';
    displayForm += '<div class="form-group"><label><b>SubCategory  :</b></label><input type="text" class="form-control"  name="subCategory" id="subCategory"/></div>';
    displayForm += '<div class="form-group"><label><b>Product Name  :</b></label><input type="text" class="form-control" name="productName" id="productName"/></div>';
    displayForm += '<div class="form-group"><label><b>Price  :</b></label><input type="number" class="form-control"  name="price" id="price"/></div>';
    displayForm += '<div class="form-group"><label><b>Discount  :</b></label><input type="number" class="form-control"  name="discount" id="discount"/></div>';
    displayForm += '<div class="form-group"><label><b>Product Image  :</b></label><input type="text"  class="form-control" name="imgUrl" id="imgUrl"/></div>';
    displayForm += '<div class="form-group"><label><b>Description  :</b></label><input type="text" class="form-control"  name="description" id="description"/></div>';
    displayForm += '<div class="form-group"><label><b>Brand  :</b></label><input type="text" class="form-control"  name="brand" id="brand"/></div>';
    displayForm += '<div class="form-group"><label><b>Rating  :</b></label><input type="text" class="form-control"  name="rating" id="rating"/></div>';
    displayForm += '<button type="submit" value="postData">Post Data</button></form>';
    $("#adminWorkArea").empty();
    $("#adminWorkArea").append(displayForm);      
}



function goToDeleteProduct()
{
    var idField = ' ';
    idField += '<h3>Provide Product Id</h3>';
    idField += '<form><div class="form-group"><label><b>Product Id  :</b></label><input type="text" class="form-control" name="productId" id="productId"/></div>';
    idField += '<button type="submit" value="deleteProduct">Delete Product</button></form>';

    $("#adminWorkArea").empty();
    $("#adminWorkArea").append(idField);   
}