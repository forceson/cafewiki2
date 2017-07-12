require 'differ/string'
require 'uri'

class CafesController < ApplicationController
  before_action :cafe_common, only: [:show, :edit]
  before_action :cafe_common_id, only: [:update, :destroy]
  
  def index
  end

  def new
    @lat = params[:lat]
    @lng = params[:lng]
    @address = params[:address]
    @cafes = Cafes.new
  end

  def create
    @cafes = Cafes.new(get_params)
    respond_to do |format|
      if @cafes.save
        format.html { redirect_to URI.encode('/cafes/'+params[:name]), notice: "카페가 안전하게 등록되었습니다." }
      else
        format.html { render action: "new" }
      end
    end
  end

  def show
  end

  def edit
  end

  def update
    respond_to do |format|
      if @cafes.update(get_params)
        format.html { redirect_to URI.encode('/cafes/'+params[:name]), notice: "카페 정보가 안전하게 수정되었습니다." }
      else
        format.html { render action: "edit" }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @cafes.destroy
        format.html { redirect_to cafe_path }
      end
    end
  end
  
  def history
    @cafes = Cafes.find_by_name(params[:name])
    @versions = Cafes.find_by_name(params[:name]).versions[params[:ver].to_i]
  end
  
  def history_list
    @cafes = Cafes.find_by_name(params[:name])
    @url = request.original_url
  end
  
  def differ
    @cafe = Cafes.find_by_name(params[:name])
    @old_ver = params[:old_ver]
    @new_ver = params[:new_ver]
    
    @old = Cafes.find_by_name(params[:name]).versions[params[:old_ver].to_i].reify.content
    if Cafes.find_by_name(params[:name]).ver != params[:new_ver].to_i
      @new  = Cafes.find_by_name(params[:name]).versions[params[:new_ver].to_i].reify.content
    else
      @new = Cafes.find_by_name(params[:name]).content
    end
    @diff = (@new - @old)
  end
  Differ.format = :html
  
  private
  
  def get_params
    params.require(:cafes).permit([:markericon, :name, :phone, :lat, :lng, :address, :content, :americano, :size, :toilet, :parking, :allnight, :floor, :ip, :ver])
  end
  
  def cafe_common
    @cafes = Cafes.find_by_name(params[:name])
  end
  def cafe_common_id
    @cafes = Cafes.find(params[:id])
  end
  
end
