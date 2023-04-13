const table= document.getElementById('table');
const text=document.getElementById('myInput');
async function enterdata(url)
{
    const response= await fetch(url);//fetching the data
    const data=await response.json();//converting into json format
    createTable(data);
    text.addEventListener('keyup',function() {search(data)});  //search function is called for every keyup    
}

enterdata('https://64350a2c83a30bc9ad567b2a.mockapi.io/assignment010');

function createTable(data)
{
    // console.log(data);
    const table_head= document.createElement('thead'); //table head is created
    table_head.innerHTML="<tr></tr>";//adding row to table header
    table_head.className='table-header';//class name assigned to table header
    const table_body= document.createElement('tbody'); //table body is created
    table_body.className='table-body';// class name assigned to table body
    table.appendChild(table_head);
    table.appendChild(table_body);//both table header and table child is appeneded to table 

    for (const headerText in data[0])
        {
            const headerElement= document.createElement('th');//a table header is created for each key
            headerElement.textContent=headerText;//the created table header is given the content same as the name of the key
            table_head.appendChild(headerElement);// table header is appended as child to tablehead
        }
        
        for (const x of data) 
        {
            const newRow= document.createElement('tr');//a row is created for each array object
            for (const key in x)
            {
                if(key=='avatar')//if the object element is an img source a new img element is created along with a table data element.
                {
                    const newRowData= document.createElement('td'); 
                    const img= document.createElement('img');
                    img.src=x[key];
                    newRowData.appendChild(img);
                    newRow.appendChild(newRowData);
                }
                else//if the object element is not an image a table data is created and is appended to the new row created for each array object.
                {
                    const newRowData= document.createElement('td'); 
                    newRowData.textContent=x[key] ;
                    newRow.appendChild(newRowData);
                }
             
            }
            table_body.appendChild(newRow);            
        }
}
function search(data)//search function receives the jason data.
        {
            if(table.firstChild)//if the table has contents i.e any body and header then it will get removed
            {
                while(table.hasChildNodes())// removes both table header and table body.
                {
                    table.firstChild.remove();    
                }
            }
            let search_item; //declaring of varibale to store the regex object for the search text.
            let newData = [];// aray to store the objects which have the search text in it.
            search_item = new RegExp(text.value ,'i');
            for (const x of data) // traversing through the array.
            {
                for (const key in x) //traversing through the object.
                {
                    if(key=='avatar')// skip the text of source of image.
                    {
                        continue;
                    }
                    else if(search_item.test(x[key].toString()))// changes each object element to string with regex. test retures true or false
                    {
                        newData.push(x);// if true a new object ia added to the array.
                        break;// once the object is added to the new array it won't further check for string matches in next elements of the same objects.
                        //thus preventing the same object to be added multiple times.
                    }   
                } 
            } 
            createTable(newData); // the new array being created is sent to createtable function to create a new table.
            newData.splice();
            console.log(newData);
        }
