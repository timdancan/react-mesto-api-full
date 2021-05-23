import "../pages/index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Register } from "./Register";
import { Login } from "./Login";
import { InfoTooltip } from "./InfoTooltip";
import { ProtectedRoute } from "./ProtectedRoute";
import { authorize, getContent, register } from "../utils/Auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentCards, setCurrentCards] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [InfoTooltipOpen, setInfoTooltipOpen] = useState({
    isOpen: false,
    successful: false,
  });
  const [email, setEmail] = useState("");
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState({
    isOpen: false,
    card: {},
  });
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    element: {},
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCurrentCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCurrentCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCurrentCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  };

  const changeStateEditProfile = () => {
    setEditProfilePopupOpen(true);
  };

  const changeStateAddPlace = () => {
    setAddPlacePopupOpen(true);
  };

  const changeStateAvatarProfile = () => {
    setEditAvatarPopupOpen(true);
  };

  const changeStateConfirmeDelete = (card) => {
    setConfirmDeletePopupOpen({
      ...isConfirmDeletePopupOpen,
      isOpen: true,
      card: card,
    });
  };

  const handleCardClick = (card) => {
    setSelectedCard({ isOpen: true, element: card });
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoTooltipOpen({ ...InfoTooltipOpen, isOpen: false });
    setConfirmDeletePopupOpen({ ...isConfirmDeletePopupOpen, isOpen: false });
    setSelectedCard({ ...selectedCard, isOpen: false });
  };

  const handleUpdateUser = (data) => {
    api
      .saveUserChanges(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    console.log(avatar);
    api
      .changedAvatar(avatar)
      .then((data) => {
        setCurrentUser({ ...currentUser, avatar: data.avatar })
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    console.log(data);
    api
      .postNewCard(data)
      .then((newCard) => {
        setCurrentCards([newCard, ...currentCards])
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegister = ({ email, password }) => {
    register(email, password)
      .then((data) => { 
        console.log(data);
        if (data) {
          setInfoTooltipOpen({ isOpen: true, successful: true });
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipOpen({ isOpen: true, successful: false });
      });
  };

  const handleLogin = ({ email, password }) => {
    return authorize(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          setLoggedIn(true);
          console.log(email);
          setEmail(email);
          localStorage.setItem("token", data.token);
          history.push("/");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tokenCheck = () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      getContent(token).then((data) => {
        if (data) {
          setLoggedIn(true);
          history.push("/");
          setEmail(data.data.email)
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
      });
    }
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/sign-in");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={currentCards}>
        <div className="App">
          <div className="page">
            <Header exit={deleteToken} email={email} loggedIn={loggedIn} />
            <Switch>
              <ProtectedRoute
                exact
                path="/"
                loggedIn={loggedIn}
                component={Main}
                onEditProfile={changeStateEditProfile}
                onAddPlace={changeStateAddPlace}
                onEditAvatar={changeStateAvatarProfile}
                onConfirmeDelete={changeStateConfirmeDelete}
                onCardClick={handleCardClick}
                handleCardLike={handleCardLike}
                handleCardDelete={handleCardDelete}
              ></ProtectedRoute>

              <Route path="/sign-up">
                <Register onRegister={handleRegister} />
              </Route>

              <Route path="/sign-in">
                <Login onLogin={handleLogin} />
              </Route>

              <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>

            <InfoTooltip data={InfoTooltipOpen} onClose={closeAllPopups} />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <ConfirmDeletePopup
              isOpen={isConfirmDeletePopupOpen}
              onClose={closeAllPopups}
              onCardDelete={handleCardDelete}
            />

            <ImagePopup onClose={closeAllPopups} card={selectedCard} />
            <Footer />
          </div>
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
