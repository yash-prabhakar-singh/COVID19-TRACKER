package com.watchlist.repo;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import com.watchlist.domain.Watchlist;

public interface WatchlistRepository extends MongoRepository<Watchlist, Integer>{
	
	@Query(value = "{'userId': ?0}")
	 List<Watchlist>findByuserId(@Param("id") Integer userId);

	@Query(value = "{'_id': ?0}", delete = true)
	Watchlist deleteById(String id);
	
	@Query(value = "{'country': ?0, 'userId': ?1}")
	public Watchlist findBycountryAndUserId(String country, Integer userId);
	

}
