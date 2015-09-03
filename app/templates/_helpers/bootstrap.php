<?php

defined('_JEXEC') or die;

require_once('template.php');
$template = new Template($this);

$app		= JFactory::getApplication();
$doc		= JFactory::getDocument();
$tpath		= $this->baseurl.'/templates/'.$this->template;
$params		= $app->getTemplate(true)->params;

// TODO: Remove all unused scripts
//unset($this->_scripts[JURI::root(true).'/media/jui/js/jquery.min.js']);
//unset($this->_scripts[JURI::root(true).'/media/jui/js/jquery-noconflict.js']);
//unset($this->_scripts[JURI::root(true).'/media/jui/js/jquery-migrate.min.js']);
//unset($this->_scripts[JURI::root(true).'/media/system/js/caption.js']);
//unset($this->_scripts[JURI::root(true).'/media/jui/js/bootstrap.min.js']);
//unset($this->_script['text/javascript']);
	
// add Stylesheet
$doc->addStyleSheet($tpath . '/css/main.min.css');
$doc->addStyleDeclaration('body{background-color:' . $params->get('background_color') . '}');

// add Script
JHtml::_('jquery.framework');
$doc->addScript($tpath . '/js/main.min.js');

if ( $this->countModules('position-7') AND $this->countModules('position-8')) {
	$columnMiddle = 'column-6';
} else
if ( $this->countModules('position-7') XOR $this->countModules('position-8')) {
	$columnMiddle = 'column-9';
} else {
	$columnMiddle = 'column-12';
}