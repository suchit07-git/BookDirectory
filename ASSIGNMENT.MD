# Assignment
Add additional features to the Book Directory by adding code to the existing basic application. 🚀

## Instructions to submit the assignment. 📃

  - Fork this repo.
  - Add your group members as collaborators to your fork. See instructions [here](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository)
  - Create a separate branch for each task by the name `Task - <Task No>`. Eg: `Task - 1`
  - Commit and Push the changes to the respective branch.
  - Commit history would be checked to validate the contribution by each member.
  - Once completed, submit [this Google Form](https://docs.google.com/forms/d/e/1FAIpQLSdoQBbvMO3da9iHWSM483miJv_j0IitnMR869JL4sxoCnoQfQ/viewform?usp=sf_link) with the link to your fork.

## Tasks

### 1. Read individual books 📖

  - Create a `GET` request to get the information of a particular book.
  - Display all the information of this book on a new/same page.
  - Hyperlink each book displayed on the `/books` page to this. 
  Clicking this book must lead to the individual book's information. For instance, clicking book 1 must lead to `/books/1`

### 2. Edit an existing book 📝

  - Provide an edit button for each book. 
  - Upon clicking this, user must be able to see a form (similar to the form on `/add`). This form must be already filled with the details of the book we are trying to edit.
  - Create a `PATCH` or `PUT` request to update the details of this book.

### 3. Delete an existing book 🗑️

  - Create a `DELETE` request to delete a book by its id.
  - You are free to provide a delete button wherever suitable.

### 4. Show Bestselling books 🔖 (Optional)

  - Add a new `boolean` field called `bestseller` to the `bookSchema`.
  - Create a new page to display only the bestselling books. This would mean fetching only those books from our database that have `bestseller` set to `true`.

## Marks Distribution

Task 1 - 25  
Task 2 - 40  
Task 3 - 20  
Git usage - 15    
  
Each task will be evaulated on the following metrics:  
  
Completion - 50%  
UI - 30%  
Code Quality- 20%  

## Resources

- [https://nodejs.org/api/modules.html#modules_modules](https://nodejs.org/api/modules.html#modules_modules)

- [https://expressjs.com/en/starter/basic-routing.html](https://expressjs.com/en/starter/basic-routing.html )

- [https://expressjs.com/en/guide/routing.html](https://expressjs.com/en/guide/routing.html)

- [node-js-crud-operations-using-mongoose-and-mongodb-atlas](https://www.google.com/url?sa=t&source=web&rct=j&url=https://www.geeksforgeeks.org/node-js-crud-operations-using-mongoose-and-mongodb-atlas/amp/&ved=2ahUKEwjckYe5i874AhX4SGwGHQTmAMcQFnoECAYQAQ&usg=AOvVaw0BfMBwxvxak6ikSEYbXWLj)

- [https://ejs.co/](https://ejs.co/)
  
 
