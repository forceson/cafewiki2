require 'test_helper'

class CafesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get cafes_index_url
    assert_response :success
  end

  test "should get new" do
    get cafes_new_url
    assert_response :success
  end

  test "should get create" do
    get cafes_create_url
    assert_response :success
  end

  test "should get show" do
    get cafes_show_url
    assert_response :success
  end

  test "should get edit" do
    get cafes_edit_url
    assert_response :success
  end

  test "should get update" do
    get cafes_update_url
    assert_response :success
  end

  test "should get destroy" do
    get cafes_destroy_url
    assert_response :success
  end

end
