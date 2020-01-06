var express = require('express');

module.exports = (req, res, next) => {
    if (req.isAuthenticated())
      return next();
     
    res.send({
      redirect: '/login'
    })
}