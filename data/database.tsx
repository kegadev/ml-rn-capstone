import * as SQLite from "expo-sqlite";
import { MenuItemType } from "../types/types";
// import { SECTION_LIST_MOCK_DATA } from "./utils";

const db = SQLite.openDatabase("little_lemon");

// export async function createTable() {
//   return new Promise((resolve, reject) => {
//     console.log("createTable");

//     db.transaction(
//       (tx) => {
//         console.log("gonna execute " + tx);
//         // console.log(tx);
//         tx.executeSql(
//           "create table if not exists menuitems (id integer primary key not null, uuid text, name text, price text, description text, category text);"
//         );
//         console.log("executed");
//       },
//       reject,
//        ()=>resolve()
//       //   reject,
//     );
//   });
// }

export async function createTable() {
  return new Promise<void>((resolve, reject) => {
    console.log("createTable");

    db.transaction(
      (tx) => {
        // console.log("gonna execute " + tx);
        tx.executeSql(
          "create table if not exists menuitems (id integer primary key not null, uuid text, name text, price text, description text, category text, image text);"
        );
        // console.log("executed");
      },
      reject,
      () => resolve() // Wrap resolve in another function
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      let query = "select * from menuitems";
      console.log("query", query);
      tx.executeSql(query, [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export async function truncateTable() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM menuitems");
      // tx.executeSql("TRUNCATE TABLE menuitems");
    });
  });
}

export function saveMenuItems(menuItems: MenuItemType[]) {
  // 2. Implement a single SQL statement to save all menu data in a table called menuitems.
  // Check the createTable() function above to see all the different columns the table has
  // Hint: You need a SQL statement to insert multiple rows at once.

  return new Promise((resolve) => {
    db.transaction(
      (tx) => {
        menuItems.forEach((element) => {
          tx.executeSql(
            "INSERT INTO menuitems (uuid,name,price,description,category, image) VALUES (?,?,?,?,?,?)",
            [
              element.name,
              element.name,
              element.price,
              element.description,
              element.category,
              element.image,
            ]
          );
        });
      },
      (error) => {
        console.log("error", error);
      }
    );
  });

  // return new Promise((resolve) => {
  //   db.transaction(
  //     (tx) => {
  //       tx.executeSql(
  //         "INSERT INTO menuitems (uuid,tittle,price,category) VALUES (?,?,?,?)",
  //         [menuItems.uuid, menuItems.title, menuItems.price, menuItems.category]
  //       );
  //     },
  //     (error) => {
  //       console.log("error", error);
  //     }
  //   );
  // });
}

/**
 * 4. Implement a transaction that executes a SQL statement to filter the menu by 2 criteria:
 * a query string and a list of categories.
 *
 * The query string should be matched against the menu item titles to see if it's a substring.
 * For example, if there are 4 items in the database with titles: 'pizza, 'pasta', 'french fries' and 'salad'
 * the query 'a' should return 'pizza' 'pasta' and 'salad', but not 'french fries'
 * since the latter does not contain any 'a' substring anywhere in the sequence of characters.
 *
 * The activeCategories parameter represents an array of selected 'categories' from the filter component
 * All results should belong to an active category to be retrieved.
 * For instance, if 'pizza' and 'pasta' belong to the 'Main Dishes' category and 'french fries' and 'salad' to the 'Sides' category,
 * a value of ['Main Dishes'] for active categories should return  only'pizza' and 'pasta'
 *
 * Finally, the SQL statement must support filtering by both criteria at the same time.
 * That means if the query is 'a' and the active category 'Main Dishes', the SQL statement should return only 'pizza' and 'pasta'
 * 'french fries' is excluded because it's part of a different category and 'salad' is excluded due to the same reason,
 * even though the query 'a' it's a substring of 'salad', so the combination of the two filters should be linked with the AND keyword
 *
 */
export async function filterByQueryAndCategories(
  query: string,
  activeCategories: string[]
) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        let queryStr = "select * from menuitems";
        if (query) {
          queryStr += ` where name like '%${query}%'`;
        }
        if (activeCategories && activeCategories.length) {
          if (query) {
            queryStr += " and";
          } else {
            queryStr += " where";
          }
          queryStr += " category in (";
          activeCategories.forEach((category, index) => {
            queryStr += `'${category}'`;
            if (index < activeCategories.length - 1) {
              queryStr += ",";
            }
          });
          queryStr += ")";
        }
        tx.executeSql(queryStr, [], (_, { rows }) => {
          resolve(rows._array);
        });
      },
      reject
      //   ()=>resolve()
    );

    // resolve(SECTION_LIST_MOCK_DATA);
  });
}
