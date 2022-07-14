package com.watchlist.domain;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
public class Watchlist {
		@Id
		private String _id;
		
		public int userId;
		public String country;
		public String details;
		
		
		
		public Watchlist(String _id, int userId, String country, String details) {
			super();
			this._id = _id;
			this.userId = userId;
			this.country = country;
			this.details = details;
		}
		public String get_id() {
			return _id;
		}
		public void set_id(String _id) {
			this._id = _id;
		}
		public int getUserId() {
			return userId;
		}
		public void setUserId(int userId) {
			this.userId = userId;
		}
		public String getCountry() {
			return country;
		}
		public void setCountry(String country) {
			this.country = country;
		}
		public String getDetails() {
			return details;
		}
		public void setDetails(String details) {
			this.details = details;
		}
		
		
		
		
		
		
		
		
}
