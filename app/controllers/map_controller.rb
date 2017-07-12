class MapController < ApplicationController
  def google
    @q = Cafes.ransack(params[:q])
    @cafes = @q.result(distinct: true)
    @query_latitude = params[:lat]
    @query_longitude = params[:lng]
    @query_zoom = params[:zoom]
    @remote_ip = request.env["HTTP_X_FORWARDED_FOR"]
    @url = request.original_url
    respond_to do |format|
      format.html {render :layout => 'map'}
      format.json {render :json =>@cafes, :layout => 'map'}
      format.js 
    end
  end

  def daum
    @q = Cafes.ransack(params[:q])
    @cafes = @q.result(distinct: true)
    @query_latitude = params[:lat]
    @query_longitude = params[:lng]
    @query_zoom = params[:zoom]
    @remote_ip = request.env["HTTP_X_FORWARDED_FOR"]
    @url = request.original_url
    respond_to do |format|
      format.html {render :layout => 'map'}
      format.json {render :json =>@cafes, :layout => 'map'}
      format.js 
    end
  end
end
