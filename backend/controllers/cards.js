const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      /* Card.findById(card._id)
        .populate('owner')
        .then(() => res.status(201).send(card))
        .catch(() => next(new ValidationError('Пользователь по указанному _id не найден'))); */
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(`${err.message}`));
      }
      return next(err);
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    // .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка по указанному _id не найдена'));
      } else
        if (!card.owner.equals(req.user._id)) {
          next(new ForbiddenError('Недостаточно прав для удаления'));
        }
      Card.findByIdAndDelete(req.params.cardId)
        .then(() => res.send({ message: 'Карточка успешно удалена' }))
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new ValidationError('Ошибка, некорректный _id'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('Карточка по указанному _id не найдена'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => new Error('NotFoundError'))
    // .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Ошибка, некорректный _id'));
      } else
        if (err.message === 'NotFoundError') {
          next(new NotFoundError('Карточка по указанному _id не найдена'));
        } else {
          next(err);
        }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => new Error('NotFoundError'))
    // .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Ошибка, некорректный _id'));
      } else
        if (err.message === 'NotFoundError') {
          next(new NotFoundError('Карточка по указанному _id не найдена'));
        } else {
          next(err);
        }
    });
};
