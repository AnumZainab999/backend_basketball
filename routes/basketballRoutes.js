const express = require("express");
const router = express.Router();
const {
  getPastMatches, getUpcomingMatches, getLiveMatches,
  getPastInternationalMatches, getUpcomingInternationalMatches, getLiveInternationalMatches,
  getPastLeagueMatches, getUpcomingLeagueMatches, getLiveLeagueMatches,
} = require("../controllers/basketballController");

// Basketball
router.get("/past", getPastMatches);
router.get("/upcoming", getUpcomingMatches);
router.get("/live", getLiveMatches);

// International Basketball
router.get("/international/past", getPastInternationalMatches);
router.get("/international/upcoming", getUpcomingInternationalMatches);
router.get("/international/live", getLiveInternationalMatches);

// League Basketball
router.get("/league/past", getPastLeagueMatches);
router.get("/league/upcoming", getUpcomingLeagueMatches);
router.get("/league/live", getLiveLeagueMatches);

module.exports = router;