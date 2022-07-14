package com.watchlist.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.watchlist.domain.Watchlist;
import com.watchlist.repo.WatchlistRepository;
import com.watchlist.service.WatchlistService;

@RestController
@RequestMapping("/watchlist")
public class MyController {
	
	@Autowired
	private WatchlistService watchlistService;
	
	
	@PostMapping("/")
	public List<Watchlist> addWatchlist(@RequestBody Watchlist watchlist){
		List<Watchlist> list = new ArrayList<Watchlist>();
		Watchlist watchlist3 = watchlistService.findBycountryAndUserId(watchlist.getCountry(), watchlist.getUserId());
		if(watchlist3!=null) return list;
		Watchlist watchlist2 = watchlistService.addWatchlist(watchlist);
		list.add(watchlist2);
		return list;
		
	}
	@GetMapping("/")
	public List<Watchlist> getWatchlist() {
		return watchlistService.getWatchlist();
	}
	
	@GetMapping("/{id}")
	public  List<Watchlist>  getWatchlistById(@PathVariable("id") Integer userId){
		return watchlistService.getWatchlistById(userId);
		
	}
	
	@DeleteMapping("/{id}")
	public Watchlist removeWatchlist(@PathVariable("id") String docId) {
		return watchlistService.removeWatchlist(docId);
		
	}

}
