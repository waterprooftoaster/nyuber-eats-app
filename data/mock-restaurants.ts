export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  address: string;
  deliveryTime: string;
  menuItems: MenuItem[];
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: "Joe's Pizza",
    image: '',
    address: '7 Carmine St, New York, NY 10014',
    deliveryTime: '15–25 min',
    menuItems: [
      { id: '1-1', name: 'Cheese Slice', price: 4.5, image: '' },
      { id: '1-2', name: 'Pepperoni Slice', price: 5.0, image: '' },
      { id: '1-3', name: 'Whole Pie', price: 22.0, image: '' },
      { id: '1-4', name: 'Sicilian Slice', price: 5.5, image: '' },
      { id: '1-5', name: 'Garlic Knots (6)', price: 6.0, image: '' },
      { id: '1-6', name: 'Caesar Salad', price: 9.0, image: '' },
    ],
  },
  {
    id: '2',
    name: 'Shake Shack',
    image: '',
    address: '691 8th Ave, New York, NY 10036',
    deliveryTime: '20–30 min',
    menuItems: [
      { id: '2-1', name: 'ShackBurger', price: 10.19, image: '' },
      { id: '2-2', name: 'SmokeShack', price: 11.59, image: '' },
      { id: '2-3', name: "Shack Stack", price: 13.09, image: '' },
      { id: '2-4', name: 'Crinkle Cut Fries', price: 4.29, image: '' },
      { id: '2-5', name: 'Cheese Fries', price: 5.29, image: '' },
      { id: '2-6', name: 'Vanilla Shake', price: 7.29, image: '' },
      { id: '2-7', name: 'Chocolate Shake', price: 7.29, image: '' },
    ],
  },
  {
    id: '3',
    name: 'Sweetgreen',
    image: '',
    address: '1164 Broadway, New York, NY 10001',
    deliveryTime: '10–20 min',
    menuItems: [
      { id: '3-1', name: 'Harvest Bowl', price: 15.95, image: '' },
      { id: '3-2', name: 'Guacamole Greens', price: 14.95, image: '' },
      { id: '3-3', name: 'Shroomami', price: 13.95, image: '' },
      { id: '3-4', name: 'Super Green Goddess', price: 14.45, image: '' },
      { id: '3-5', name: 'Elote Bowl', price: 15.45, image: '' },
      { id: '3-6', name: 'Spicy Thai Salad', price: 13.95, image: '' },
    ],
  },
  {
    id: '4',
    name: 'Chipotle',
    image: '',
    address: '300 W 49th St, New York, NY 10019',
    deliveryTime: '15–25 min',
    menuItems: [
      { id: '4-1', name: 'Burrito Bowl', price: 11.85, image: '' },
      { id: '4-2', name: 'Burrito', price: 11.85, image: '' },
      { id: '4-3', name: 'Tacos (3)', price: 11.85, image: '' },
      { id: '4-4', name: 'Salad', price: 11.85, image: '' },
      { id: '4-5', name: 'Chips & Guac', price: 5.95, image: '' },
      { id: '4-6', name: 'Queso Blanco', price: 5.45, image: '' },
      { id: '4-7', name: 'Quesadilla', price: 8.35, image: '' },
    ],
  },
  {
    id: '5',
    name: 'Halal Guys',
    image: '',
    address: '307 W 53rd St, New York, NY 10019',
    deliveryTime: '20–35 min',
    menuItems: [
      { id: '5-1', name: 'Chicken & Rice', price: 10.0, image: '' },
      { id: '5-2', name: 'Gyro & Rice', price: 10.0, image: '' },
      { id: '5-3', name: 'Combo & Rice', price: 11.0, image: '' },
      { id: '5-4', name: 'Falafel & Rice', price: 10.0, image: '' },
      { id: '5-5', name: 'Side Salad', price: 4.0, image: '' },
      { id: '5-6', name: 'Pita Bread', price: 1.5, image: '' },
    ],
  },
  {
    id: '6',
    name: "Katz's Delicatessen",
    image: '',
    address: '205 E Houston St, New York, NY 10002',
    deliveryTime: '25–40 min',
    menuItems: [
      { id: '6-1', name: 'Pastrami Sandwich', price: 24.95, image: '' },
      { id: '6-2', name: 'Corned Beef Sandwich', price: 24.95, image: '' },
      { id: '6-3', name: 'Brisket Sandwich', price: 22.95, image: '' },
      { id: '6-4', name: 'Ruben Sandwich', price: 23.95, image: '' },
      { id: '6-5', name: 'Matzo Ball Soup', price: 10.95, image: '' },
      { id: '6-6', name: 'Potato Knish', price: 6.95, image: '' },
      { id: '6-7', name: "Dr. Brown's Cream Soda", price: 3.5, image: '' },
    ],
  },
  {
    id: '7',
    name: "Xi'an Famous Foods",
    image: '',
    address: '81 St Marks Pl, New York, NY 10003',
    deliveryTime: '15–30 min',
    menuItems: [
      { id: '7-1', name: 'Spicy Cumin Lamb Noodles', price: 14.95, image: '' },
      { id: '7-2', name: 'Stewed Oxtail Noodles', price: 15.95, image: '' },
      { id: '7-3', name: 'Liang Pi Cold Skin Noodles', price: 11.95, image: '' },
      { id: '7-4', name: 'Tiger Vegetables Salad', price: 9.95, image: '' },
      { id: '7-5', name: 'Pork & Chive Dumplings', price: 9.95, image: '' },
      { id: '7-6', name: 'Lamb Burger', price: 7.95, image: '' },
      { id: '7-7', name: 'Pork Burger', price: 7.95, image: '' },
    ],
  },
  {
    id: '8',
    name: 'Levain Bakery',
    image: '',
    address: '167 W 74th St, New York, NY 10023',
    deliveryTime: '20–35 min',
    menuItems: [
      { id: '8-1', name: 'Chocolate Chip Walnut Cookie', price: 5.0, image: '' },
      { id: '8-2', name: 'Dark Choc Peanut Butter Cookie', price: 5.0, image: '' },
      { id: '8-3', name: 'Oatmeal Raisin Cookie', price: 5.0, image: '' },
      { id: '8-4', name: 'Two-Chip Chocolate Chip Cookie', price: 5.0, image: '' },
      { id: '8-5', name: 'Blueberry Muffin', price: 4.5, image: '' },
      { id: '8-6', name: 'Banana Walnut Bread', price: 6.0, image: '' },
    ],
  },
  {
    id: '9',
    name: 'Momofuku Noodle Bar',
    image: '',
    address: '171 1st Ave, New York, NY 10003',
    deliveryTime: '25–40 min',
    menuItems: [
      { id: '9-1', name: 'Pork Ramen', price: 19.0, image: '' },
      { id: '9-2', name: 'Chicken Ramen', price: 18.0, image: '' },
      { id: '9-3', name: 'Spicy Tare Ramen', price: 19.0, image: '' },
      { id: '9-4', name: 'Pork Buns (2)', price: 14.0, image: '' },
      { id: '9-5', name: 'Shrimp Buns (2)', price: 15.0, image: '' },
      { id: '9-6', name: 'Cucumber Kimchi', price: 7.0, image: '' },
      { id: '9-7', name: 'Wings', price: 16.0, image: '' },
      { id: '9-8', name: 'Cereal Milk Soft Serve', price: 9.0, image: '' },
    ],
  },
  {
    id: '10',
    name: 'Taim Falafel',
    image: '',
    address: '222 Waverly Pl, New York, NY 10014',
    deliveryTime: '10–20 min',
    menuItems: [
      { id: '10-1', name: 'Classic Falafel Sandwich', price: 11.5, image: '' },
      { id: '10-2', name: 'Harissa Falafel Sandwich', price: 11.5, image: '' },
      { id: '10-3', name: 'Pistachio Falafel Sandwich', price: 12.0, image: '' },
      { id: '10-4', name: 'Falafel Plate', price: 14.5, image: '' },
      { id: '10-5', name: 'Israeli Salad', price: 8.0, image: '' },
      { id: '10-6', name: 'Hummus', price: 8.0, image: '' },
      { id: '10-7', name: 'Baba Ghanoush', price: 8.0, image: '' },
    ],
  },
];
