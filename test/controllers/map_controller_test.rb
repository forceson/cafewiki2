require 'test_helper'

class MapControllerTest < ActionDispatch::IntegrationTest
  test "should get google" do
    get map_google_url
    assert_response :success
  end

  test "should get daum" do
    get map_daum_url
    assert_response :success
  end

end
