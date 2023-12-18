# 41

My 41 homework
Display the list of characters in the form of a table.

You can create tables yourself on the website:

https://mockapi.io/projects

Example resource object for"heroes" (the path should be "heroes"):

{
"name": "Iron Man",
"comics": "Marvel",
"favourite": true,
"id": "1"
}
Example resource object for "universes":

{
"id": "1",
"name": "Marvel"
}
The table consists of 4 columns:

Name Surname
Comics (DC, Marvel, Comix Zone)
Favourite (checkbox)
Actions (Delete button)
Above the table, there's a form with three fields for adding a new character:

Name Surname (input)
Comics (DC, Marvel, Comix Zone) (select) – data retrieved using the GET method from the "universes" resource
Favourite (true, false) (checkbox)
Actions:

Upon form submission, the character is added to the database (POST), and the information about the hero is displayed in an HTML row in the table. If a hero with the same "name" property already exists in the database, the object is not added to the database (you can simply log a message to the console stating that a user with that name already exists in the database).
When the checkbox state in the "Favourite" column is changed, the data for that character is updated in the database (PUT).
Upon clicking the Delete button in the character's row, the corresponding hero is removed from the database (DELETE), and the corresponding <tr> element is removed from the table.
