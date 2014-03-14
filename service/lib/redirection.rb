require 'net/http'
require 'uri'

class Redirector
  def fetch(uri_str, limit = 10)
    raise ArgumentError, 'HTTP redirect too deep' if limit == 0

    url = URI.parse(uri_str)
    req = Net::HTTP::Get.new(url.path.empty? ? '/' : url.path)

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = (url.scheme == "https")
    response = http.request(req)

    case response
      when Net::HTTPSuccess     then url.to_s
      when Net::HTTPRedirection then fetch(response['location'], limit - 1)
      else
        response.error!
    end
  end
end
