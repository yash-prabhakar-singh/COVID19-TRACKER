package com.watchlist.service;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.watchlist.domain.Watchlist;
import com.watchlist.repo.WatchlistRepository;

@Service
public class WatchListImpl implements WatchlistService{
	@Autowired
	private WatchlistRepository watchlistRepository;

	@Override
	public Watchlist addWatchlist(Watchlist watchlist) {
		return watchlistRepository.save(watchlist);
	}

	@Override
	public List<Watchlist> getWatchlist() {
		return watchlistRepository.findAll();
	}

	
	@Override
	public List<Watchlist> getWatchlistById(Integer userId) {
		return  watchlistRepository.findByuserId(userId);
	}

	@Override
	public Watchlist removeWatchlist(String docId) {
		// TODO Auto-generated method stub
		return watchlistRepository.deleteById(docId);
	}
	
	@Override
	public Watchlist findBycountryAndUserId(String country, Integer userId) {
		return watchlistRepository.findBycountryAndUserId(country, userId);
	}

	
}
