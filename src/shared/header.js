import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  FcSearch,
  FcImport,
  FcExport,
  FcList,
  FcPrevious,
} from "react-icons/fc";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { useAuth, useFetchData, useCart } from "../util/hooks";
import { DATA_ACTIONS } from "../util/constants";
import { Button } from "../components/button";

export function Header({ isModal, toggleIsModal, isMenu, toggleIsMenu }) {
  const auth = useAuth();
  const { user, isLoggedIn } = auth.state;

  const cart = useCart();
  const { state, calculateNumItemsInCart } = cart;

  const data = useFetchData();
  const { dispatch, searchItems } = data;
  const { searchQuery } = data.state;

  const [isSearch, toggleIsSearch] = useState(false);

  const history = useHistory();

  const handleLogout = () => {
    toggleIsModal(!isModal);
    auth.logout();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: DATA_ACTIONS.INPUT,
      fieldName: name,
      payload: { value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleIsSearch(false);
    await searchItems(searchQuery);
    history.push("/search");
  };

  return (
    <header
      className="fixed top-0 z-30 flex flex-wrap items-center justify-between w-full px-6 py-4 bg-primary-light md:px-10 lg:px-20"
      style={{ minHeight: `80px` }}
    >
      <NavLink
        to="/"
        className="w-1/12 text-2xl border-b border-secondary-light"
      >
        <span className="font-bold text-secondary-dark">P</span>etsy
      </NavLink>

      <div className="flex items-center w-11/12">
        <div className="flex justify-end w-3/4 md:w-5/6">
          <Button handleClick={() => toggleIsSearch(!isSearch)}>
            <FcSearch className="icon" />
          </Button>
        </div>

        {/* CART */}
        <NavLink
          className={`navlink w-1/6 md:w-1/12 justify-center`}
          to="/cart"
          onClick={() => toggleIsMenu(false)}
          activeClassName=""
        >
          <span className="relative">
            <AiOutlineShoppingCart
              className="icon"
              style={{ color: `rgb(0, 109, 255)` }}
            />
            <span className="absolute top-0 right-0 z-10 px-2 py-0 -mt-2 -mr-2 text-sm font-bold bg-gray-200 rounded-full bg-opacity-90 text-secondary-dark lg:text-xl">
              {state.cart.length ? calculateNumItemsInCart() : null}
            </span>
          </span>
        </NavLink>

        <Button
          handleClick={() => toggleIsMenu(!isMenu)}
          extraClass="w-1/6 h-auto md:w-1/12"
        >
          {isLoggedIn ? (
            <img
              src={user.picture}
              alt=""
              className="mx-auto rounded-full md:w-3/4 lg:w-1/2"
            />
          ) : (
            <FaRegUserCircle className="w-10 h-10 mx-auto text-secondary-light" />
          )}
        </Button>
      </div>

      <div
        style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}
        className={`${
          isSearch ? "flex" : "hidden"
        } w-screen h-screen fixed top-0 left-0 z-40`}
      >
        <div className="flex items-center justify-between w-full h-16 px-2 py-4 bg-gray-200">
          <Button handleClick={() => toggleIsSearch(false)} extraClass="w-1/12">
            <FcPrevious className={`icon mx-auto`} />
          </Button>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex items-center w-11/12 h-full mx-auto lg:w-7/12"
          >
            <input
              type="search"
              className="w-11/12 p-2 rounded"
              placeholder="Search Petsy..."
              value={searchQuery}
              name="searchQuery"
              onChange={handleChange}
            />
            <Button extraClass="w-1/12">
              <FcSearch className={`icon mx-auto`} />
            </Button>
          </form>
        </div>
      </div>

      <nav
        className={`${
          isMenu ? `flex` : `hidden`
        } fixed w-screen min-h-screen p-4 top-0 right-0 z-10 bg-primary-light border-l border-primary shadow-2xl flex-col lg:items-end lg:w-1/4 transition-all duration-300 ease-in-out`}
      >
        <Button
          handleClick={() => toggleIsMenu(!isMenu)}
          extraClass="w-1/6 ml-auto p-2"
        >
          <AiOutlineClose
            className={`icon mx-auto text-primary-dark hover:bg-secondary-light rounded-full`}
          />
        </Button>
        {isLoggedIn ? (
          // AUTH'D
          <>
            <div className="flex flex-col items-start w-full">
              {/* PROFILE */}
              <NavLink
                className={`navlink border-b border-gray-400 w-full mb-4 pb-2`}
                to={`/users/${user.id}`}
                onClick={() => toggleIsMenu(!isMenu)}
              >
                {/* <FcInfo className="icon" /> */}
                <img
                  src={user.picture}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                {isMenu ? <span className="mx-2">{user.username}</span> : null}
              </NavLink>

              {/* CART */}
              <NavLink
                className={`navlink`}
                to="/cart"
                onClick={() => toggleIsMenu(!isMenu)}
              >
                <span className="relative">
                  <AiOutlineShoppingCart
                    className="icon"
                    style={{ color: `rgb(0, 109, 255)` }}
                  />
                  <span className="absolute top-0 right-0 z-10 px-2 py-0 -mt-2 -mr-2 text-sm font-bold bg-gray-200 bg-opacity-75 rounded-full text-secondary-dark lg:text-xl">
                    {state.cart.length ? calculateNumItemsInCart() : null}
                  </span>
                </span>
                <span className="mx-4 md:text-xl">Your Cart</span>
              </NavLink>

              {/* ITEMS */}
              <div className="link-container">
                <NavLink
                  className="navlink"
                  to="/items"
                  onClick={() => toggleIsMenu(!isMenu)}
                >
                  <FcList className="icon" />
                  {isMenu ? (
                    <span className="mx-4 md:text-xl">Items</span>
                  ) : null}
                </NavLink>
              </div>

              {/* LOGOUT */}
              <div className="link-container">
                <Button
                  extraClass="flex items-center text-primary-dark hover:underline"
                  handleClick={toggleIsModal}
                >
                  <FcExport className="icon" />
                  {isMenu ? (
                    <span className="mx-4 md:text-xl">Logout</span>
                  ) : null}
                </Button>
              </div>
            </div>

            {/* MODAL */}
            <div
              style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}
              className={`${
                isModal ? `block` : `hidden`
              } w-screen h-screen fixed top-0 left-0 z-40`}
            >
              <div className="z-50 flex flex-col items-center justify-around w-3/4 h-64 mx-auto my-20 bg-white rounded md:w-2/3">
                <span className="font-bold">
                  Are you sure you want to logout?
                </span>
                <div className="flex items-center">
                  <Button extraClass="px-2 py-3" handleClick={toggleIsModal}>
                    Cancel
                  </Button>
                  <NavLink
                    className="flex items-center px-2 py-3 mx-6 text-white rounded bg-primary hover:bg-red-500"
                    // className="navlink"
                    to="/"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </div>
              </div>
            </div>
          </>
        ) : (
          // NON-AUTH'D
          <>
            {/* CART */}
            <NavLink
              className={`navlink`}
              to="/cart"
              onClick={() => toggleIsMenu(!isMenu)}
            >
              <span className="relative">
                <AiOutlineShoppingCart
                  className="icon"
                  style={{ color: `rgb(0, 109, 255)` }}
                />
                <span className="absolute top-0 right-0 z-10 px-2 py-0 -mt-2 -mr-2 text-sm font-bold bg-gray-200 bg-opacity-75 rounded-full text-secondary-dark lg:text-xl">
                  {state.cart.length ? calculateNumItemsInCart() : null}
                </span>
              </span>
              <span className="mx-4">Your Cart</span>
            </NavLink>

            <NavLink
              className="navlink"
              to="/login"
              onClick={() => toggleIsMenu(!isMenu)}
            >
              <FcImport className="icon" />
              <span className="mx-4">Sign In/Up</span>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
