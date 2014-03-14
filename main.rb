require 'sinatra'
require_relative './lib/redirection'

get '/parse' do
  short_url = params['url']
  red = Redirector.new
  red.fetch short_url
end
