import React, {Component} from 'react';
import Methods from './ApiMethods';
import Cookies from 'js-cookie';

export const Context = React.createContext({});

export class Provider extends Component {
    
    constructor() {
        super();
        this.apiMethods = new Methods();
        this.userCookie = Cookies.get('authenticatedUser');
        this.lastAddedCookie = Cookies.get('lastAdded');
        this.state = {
            authenticatedUser: this.userCookie ? JSON.parse(this.userCookie) : null,
            shopsListByPlace: null,
            lastAdded: this.lastAddedCookie ? JSON.parse(this.lastAddedCookie) : []
        }
    }

    createShop = async (shop) => {
        return await this.apiMethods.createShop(shop);
    }

    getShop = async (id) => {
        return await this.apiMethods.getShop(id);
    }

    getShopsByPlace = async (place) => {
        return await this.apiMethods.getShopsByPlace(place);
    }

    searchShops = async (query) => {
        return await this.apiMethods.searchShops(query);
    }

    searchAdvanced = async (orderBy, direction, query) => {
        return await this.apiMethods.searchAdvanced(orderBy, direction, query);
    }

    deleteShop = async (id) => {
        return await this.apiMethods.deleteShop(id);
    }

    updateShop = async (id, shop) => {
        return await this.apiMethods.updateShop(id, shop);
    }

    createOrder = async (order) => {
        return await this.apiMethods.createOrder(order);
    }

    getOrders = async (id) => {
        return await this.apiMethods.getOrders(id);
    }

    getClients = async (orderBy, direction) => {
        return await this.apiMethods.getClients(orderBy, direction);
    }

    getLastAdded = async (limit) => {
        return await this.apiMethods.getLastAdded(limit);
    }

    /** 
     * Checks for the user in the database, saves it in the context state and on a Cookie
     * @param  {string}  username
     * @param  {string}  password
     * @return  {object}  user
     */
    logIn = async (username, password) => {
        const user = await this.apiMethods.getUser(username, password);
        if (user !== null) {
            user.password = password;
            this.setState(() => {
                return {
                    authenticatedUser: user,
                };
            });
            Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 30});
        } else {
            console.log('Username not found')
        }
        return user;
    }

    logOut = () => {
        this.setState(() => {
            return {
                authenticatedUser: null
            }
        });
        Cookies.remove('authenticatedUser');
    }

    setShopsListByPlace = (list) => {
        this.setState(() => {
            return {
                shopsListByPlace: list
            }
        })
    }

    /** 
     * Changes the format of a given date
     * @param  {date}  date
     * @return  {string}  finalDate
     */
    formatDate = (date) => {
        const newDate = new Date(date);
        let day = newDate.getDate();
        if (day < 10) day = "0" + day;
        let month = newDate.getMonth() + 1;
        if (month < 10) month = "0" + month;
        const year = newDate.getFullYear();
        const finalDate = day + '/' + month + '/' + year;
        return finalDate;
    }

    render() {

        const value = {
            shopsListByPlace: this.state.shopsListByPlace,
            authenticatedUser: this.state.authenticatedUser,
            lastAdded: this.state.lastAdded,
            actions: {
                createShop: this.createShop,
                getShop: this.getShop,
                getShopsByPlace: this.getShopsByPlace,
                setShopsListByPlace: this.setShopsListByPlace,
                searchShops: this.searchShops,
                searchAdvanced: this.searchAdvanced,
                deleteShop: this.deleteShop,
                updateShop: this.updateShop,
                logIn: this.logIn,
                logOut: this.logOut,
                formatDate: this.formatDate,
                createOrder: this.createOrder,
                getOrders: this.getOrders,
                getClients: this.getClients,
                getLastAdded: this.getLastAdded
            }
        }

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;


/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}