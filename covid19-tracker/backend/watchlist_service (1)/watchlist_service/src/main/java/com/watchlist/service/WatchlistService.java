package com.watchlist.service;

import java.util.List;

import org.bson.types.ObjectId;

import com.watchlist.domain.Watchlist;

public interface WatchlistService {

	Watchlist addWatchlist(Watchlist watchlist);

	List<Watchlist> getWatchlist();

	

	 List<Watchlist>  getWatchlistById(Integer userId);
	 
	 Watchlist removeWatchlist(String docId);
	 
	 Watchlist findBycountryAndUserId(String country, Integer userId);

	

}
